import { Component, Inject } from '@angular/core';
import { KeySetData, KeySetManagerService } from '../key-set-manager.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RandomService } from '../random.service';
import { SnackbarService } from '../snackbar.service';
import { FormControl, Validators } from '@angular/forms';
import { TSMap } from 'typescript-map';
import { AnimationTools } from '../animation/AnimationTools';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [AnimationTools.fadeInOut()]
})
export class DashboardComponent {

  displayedCol = ['select', 'name', 'key', 'action'];

  constructor(
    public keySetManagerService: KeySetManagerService,
    public dialog: MatDialog,
    public snackbarService: SnackbarService,
    public randomService: RandomService) { }

  dataSource: KeySetData[] = [];
  animationState = new TSMap<string, boolean>();
  count = 0;

  ngOnInit() {
    this.updateKeyDataSource();
  }


  checkAnimationState(rowName: string): string {
    if (this.animationState.has(rowName)) {
      return (this.animationState.get(rowName) ? 'in' : 'out')
    } else {
      this.animationState.set(rowName, false);
      if (this.count != -1) {
        new Promise(() => {
          setTimeout(() => { this.animationState.set(rowName, true); }, 100 + this.count * 50);
        });
        this.count++;
        if (this.count == this.dataSource.length) {
          this.count = -1;
        }
      } else {
        new Promise(() => {
          setTimeout(() => { this.animationState.set(rowName, true); }, 100);
        });
      }
      return this.checkAnimationState(rowName);
    }
  }

  updateKeyDataSource() {
    this.dataSource = this.keySetManagerService.getKeySetDataSource();
  }

  delKey0(name: string) {
    this.animationState.set(name, false);
    new Promise(() => {
      setTimeout(() => {
        this.keySetManagerService.delKey(name);
        this.animationState.delete(name);
        this.updateKeyDataSource();
        this.snackbarService.openAlertSnackBar('Successfully removed!');
      }, 200);
    });
  }

  delKey(name: string) {
    const dialogRef = this.dialog.open(ConfirmDelDialog, {
      data: name
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) this.delKey0(name);
    });
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
        if (newKey.name != "" && newKey.key != "") {
          if (!this.keySetManagerService.hasKey(newKey.name)) {
            this.keySetManagerService.addKey(newKey.name, newKey.key);
            this.keySetManagerService.selectKey(newKey.name);
            this.updateKeyDataSource();
            this.snackbarService.openAlertSnackBar(`Successfully add a new key named '${newKey.name}'!`);
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
  animations: [AnimationTools.shakeIt()]
})
export class EditKeyDialog {

  editKeyFormControl = new FormControl('', [Validators.required]);
  shake = false;

  constructor(
    public dialogRef: MatDialogRef<EditKeyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: KeyDialogData,
    private randomService: RandomService) { this.editKeyFormControl.setValue(this.data.key) }

  onNoClick(): void {
    this.dialogRef.close();
  }

  randomKey(): void {
    this.editKeyFormControl.setValue(this.randomService.generateRandomKey(64));
  }

  confirm(): void {
    if (this.editKeyFormControl.value != "") {
      this.dialogRef.close(this.editKeyFormControl.value);
    } else {
      if (this.shake != true) {
        this.shake = true;
        new Promise(() => {
          setTimeout(() => {
            this.shake = false;
          }, 1000);
        })
      }
    }
  }


}


@Component({
  selector: 'dialog-new-key',
  templateUrl: 'dialog-new-key.html',
  animations: [AnimationTools.shakeIt()]
})
export class AddNewKeyDialog {

  shakeName = false;
  shakeKey = false;

  addNewKeyNameFormControl = new FormControl('', Validators.required);
  addNewKeyFormControl = new FormControl('', Validators.required);


  constructor(
    public dialogRef: MatDialogRef<AddNewKeyDialog>, private randomService: RandomService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  randomKey(): void {
    this.addNewKeyFormControl.setValue(this.randomService.generateRandomKey(64));
  }

  randomName(): void {
    this.addNewKeyNameFormControl.setValue(this.randomService.generateRandomName());
  }

  randomAll(): void {
    this.randomName();
    this.randomKey();
    this.confirm();
  }

  confirm(): void {
    if (this.addNewKeyNameFormControl.value != "" && this.addNewKeyFormControl.value == "") {
      this.dialogRef.close({name: this.addNewKeyNameFormControl.value, key: this.addNewKeyFormControl.value});
    } else {
      if (this.shakeName != true) {
        this.shakeName = true;
        this.addNewKeyNameFormControl.markAllAsTouched();
        new Promise(() => {
          setTimeout(() => {
            this.shakeName = false;
          }, 1000);
        })
      }
    }
    if (this.addNewKeyFormControl.value == "") {
      if (this.shakeKey != true) {
        this.shakeKey = true;
        this.addNewKeyFormControl.markAsTouched();
        new Promise(() => {
          setTimeout(() => {
            this.shakeKey = false;
          }, 1000);
        })
      }
    }
  }

}


@Component({
  selector: 'dialog-confirm-del',
  templateUrl: 'dialog-confirm-del.html'
})
export class ConfirmDelDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDelDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }


}

export interface KeyDialogData {
  name: string;
  key: string;
}