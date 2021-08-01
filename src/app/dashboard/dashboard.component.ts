import { Component, Inject } from '@angular/core';
import { KeySetData, KeySetManagerService } from '../key-set-manager.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RandomService } from '../random.service';
import { SnackbarService } from '../snackbar.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  displayedCol = ['select','name', 'key', 'action'];

  constructor(
    public keySetManagerService: KeySetManagerService,
    public dialog: MatDialog,
    public snackbarService: SnackbarService,
    public randomService: RandomService) { }

  dataSource: KeySetData[] = [];

  ngOnInit() {
    this.updateKeyDataSource();
  }

  updateKeyDataSource() {
    this.dataSource = this.keySetManagerService.getKeySetDataSource();
  }

  delKey(name: string) {
    this.snackbarService.openAlertSnackBar('Successfully removed!');
    this.keySetManagerService.delKey(name);
    this.updateKeyDataSource();
  }

  editKey(name: string, currentKey: string): void {
    const dialogRef = this.dialog.open(EditKeyDialog, {
      data: { name: name, key: currentKey }
    });

    dialogRef.afterClosed().subscribe(newKey => {
      if (newKey != null) {
        if (newKey != "") {
          if (newKey != currentKey) {
            this.keySetManagerService.editKey(name, newKey);
            this.updateKeyDataSource();
            this.snackbarService.openAlertSnackBar('Successfully edited!');
          } else {
            this.snackbarService.openAlertSnackBar(`No change!`);
          }
        } else {
          this.snackbarService.openAlertSnackBar(`Do not leave blank in any field!`);
        }
      }
    });
  }

  newKey() {
    const dialogRef = this.dialog.open(AddNewKeyDialog);

    dialogRef.afterClosed().subscribe(newKey => {
      if (newKey != null) {
        if (newKey[0] != "" && newKey[1] != "") {
          if (!this.keySetManagerService.hasKey(newKey[0])) {
            this.keySetManagerService.addKey(newKey[0], newKey[1]);
            this.updateKeyDataSource();
            this.snackbarService.openAlertSnackBar(`Successfully add a new key named '${newKey[0]}'!`);
          } else {
            this.snackbarService.openAlertSnackBar(`Do not use duplicated name!`);
          }
        } else {
          this.snackbarService.openAlertSnackBar(`Do not leave blank in any field!`);
        }
      }
    });
  }

  /*newRandomKey() {
    this.keySetManagerService.addKey(this.randomService.generateRandomString(8), this.randomService.generateRandomString(32));
    this.updateKeyDataSource();
    this.snackbarService.openAlertSnackBar(`Successfully generate a new key!`);
  }*/

}

@Component({
  selector: 'dialog-edit-key',
  templateUrl: 'dialog-edit-key.html',
})
export class EditKeyDialog {

  editKeyFormControl = new FormControl('', [Validators.required]);
  key = "";

  constructor(
    public dialogRef: MatDialogRef<EditKeyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditKeyDialogData, private randomService: RandomService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  randomKey(): void {
    this.data.key = this.randomService.generateRandomString(32);
  }


}


export interface EditKeyDialogData {
  name: string;
  key: string;
}

@Component({
  selector: 'dialog-new-key',
  templateUrl: 'dialog-new-key.html',
})
export class AddNewKeyDialog {

  name = "";
  key = "";

  addNewKeyNameFormControl = new FormControl('', Validators.required);
  addNewKeyFormControl = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<AddNewKeyDialog>, private randomService: RandomService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  randomKey(): void {
    this.key = this.randomService.generateRandomString(32);
  }

  randomName(): void {
    this.name = this.randomService.generateRandomString(8);
  }

  randomAll(): void {
    this.randomName();
    this.randomKey();
    this.confirm();
  }

  confirm(): void {
    this.dialogRef.close([this.name, this.key]);
  }

}



