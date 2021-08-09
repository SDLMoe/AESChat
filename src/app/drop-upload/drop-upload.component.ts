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
    // console.log("onDrop")
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
    // console.log("onDrop0")
    const reader = new FileReader();
    reader.onload = () => {
      let result = reader.result;
      if (result != null && result instanceof ArrayBuffer) {
        const fileName = file.name as string
        // .split('.')[0];
        const isEncrypted = fileName.split('.')[1] == 'encrypted';
        if (isEncrypted) {
          this.decrypt.emit({
            encryptedFileName: fileName,
            data: GCM.getTextDecoding(result)
          })
        }
        this.encrypt.emit({ fileName: fileName, dataBuffer: result });
      }
    };
    reader.readAsArrayBuffer(file);
  }

  onClick() {
    // console.log("onClick")
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
  data: string,
  encryptedFileName: string,
}