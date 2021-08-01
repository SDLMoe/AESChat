import { Component, Inject } from '@angular/core';
import { KeySetData, KeySetManagerService } from '../key-set-manager.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'button-del-cookie',
  templateUrl: './button-del-cookie.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  
  displayedCol = ['name', 'key', 'action'];

  constructor(public keySetManagerService: KeySetManagerService, public dialog: MatDialog) { this.updateKeyDataSource() }

  dataSource: KeySetData[] = [];

  updateKeyDataSource() {
    this.dataSource = this.keySetManagerService.getKeySetDataSource();
  }

  delKey(name: string) {
    this.keySetManagerService.delKey(name);
    this.updateKeyDataSource();
  }

  addKey(name: string, key: string) {
    this.keySetManagerService.addKey(name, key);
    this.updateKeyDataSource();
  }

  editKey(name: string, currentKey: string): void {
    const dialogRef = this.dialog.open(EditKeyDialog, {
      data: { name: name, key: currentKey }
    });

    dialogRef.afterClosed().subscribe(newKey => {
      this.keySetManagerService.editKey(name, newKey);
    });
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-edit-key.html',
})
export class EditKeyDialog {

  constructor(
    public dialogRef: MatDialogRef<EditKeyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditKeyDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


export interface EditKeyDialogData {
  name: string;
  key: string;
}