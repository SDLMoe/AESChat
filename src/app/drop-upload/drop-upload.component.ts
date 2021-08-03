import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GCM } from '../encryption.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-drop-upload',
  templateUrl: './drop-upload.component.html',
  styleUrls: ['./drop-upload.component.css']
})
export class DropUploadComponent implements OnInit {

  isHovering: boolean = false;

  @Input() hint = "to upload"

  @Output() encrypt = new EventEmitter<UnencryptedFileData>();
  @Output() decrypt = new EventEmitter<UndecryptedFileData>();

  constructor(
    public snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onDrop(files: FileList | null) {
    if (files != null && files.length > 0) {
      this.onDrop0(files[0]);
    } else {
      if ((<any>files).name != null) {
        this.onDrop0(files);
      } else {
        this.snackbarService.openAlertSnackBar("No file selected!");
      }
    }
  }

  onDrop0(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      let result = reader.result;
      if (result != null && result instanceof ArrayBuffer) {
        const fileName = file.name.split('.')[0];
        const isText = file.name.split('.')[1] == 'txt';
        if (isText) { this.decrypt.emit({ data: GCM.getTextDecoding(result) }) }
        this.encrypt.emit({ fileName: fileName, dataBuffer: result });
      }
    };
    reader.readAsArrayBuffer(file);
  }

  onClick() {
    const fileUpload = document.getElementById("upload") as HTMLInputElement;
    fileUpload.onchange = () => {
      this.onDrop(fileUpload.files)
    };
    fileUpload.click();
  }

}

export interface UnencryptedFileData {
  fileName: string,
  dataBuffer: ArrayBuffer
}

export interface UndecryptedFileData {
  data: string
}