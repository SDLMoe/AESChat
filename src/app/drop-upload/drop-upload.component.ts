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
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        let result = reader.result;
        if (result != null && result instanceof ArrayBuffer) {
          const fileName = file.name.split('.')[0]
          this.encrypt.emit({fileName: fileName, dataBuffer: result});
          this.decrypt.emit({data: GCM.getTextDecoding(result)})
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      this.snackbarService.openAlertSnackBar("No file selected!");
    }
  }

  onClick() {
    const fileUpload = document.getElementById(
      "upload"
    ) as HTMLInputElement;
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