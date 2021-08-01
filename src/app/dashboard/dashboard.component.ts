import { Component, Inject } from '@angular/core';
import { KeySetData, KeySetManagerService } from '../key-set-manager.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RandomService } from '../random.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  displayedCol = ['name', 'key', 'action'];

  constructor(
    public keySetManagerService: KeySetManagerService, 
    public dialog: MatDialog,
    public snackbarService:SnackbarService) { }

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
      this.keySetManagerService.editKey(name, newKey);
      this.updateKeyDataSource();
      this.snackbarService.openAlertSnackBar('Successfully edited!');
    });
  }

  newKey() {
    const dialogRef = this.dialog.open(AddNewKeyDialog);

    dialogRef.afterClosed().subscribe(newKey => {
      this.keySetManagerService.addKey(newKey[0], newKey[1]);
      this.updateKeyDataSource();
      this.snackbarService.openAlertSnackBar(`Successfully add a new key named '${newKey[0]}'!`);
    });
  }

}

@Component({
  selector: 'dialog-edit-key',
  templateUrl: 'dialog-edit-key.html',
})
export class EditKeyDialog {

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

  constructor(
    public dialogRef: MatDialogRef<AddNewKeyDialog>, private randomService: RandomService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  randomKey(): void {
    this.key = this.randomService.generateRandomString(32);
  }

}



