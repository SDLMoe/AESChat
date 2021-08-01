import { Component, OnInit } from '@angular/core';
import { EncryptionService, GCM } from '../encryption.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-encryption-image-text',
  templateUrl: './encryption-image-text.component.html',
  styleUrls: ['./encryption-image-text.component.css']
})
export class EncryptionImageTextComponent implements OnInit {

  constructor(
    public snackBarService: SnackbarService,
    public encryptionService: EncryptionService
  ) { }

  decryptedImage = ""

  ngOnInit(): void {
  }


  encrypt(fileName: string, imageBuffer: ArrayBuffer) {
    this.encryptionService.encrypt(GCM.arrayBufferToBase64(imageBuffer)).then(enc => {
      if (enc != null && enc != "") {
        var saveData = (function () {
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          return function (data: string, fileName: string) {
            var blob = new Blob([data], { type: "text/plain" }),
              url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
          };
        }());
        saveData(enc, fileName + "-encrypted.txt");
      }
    });
  }

  decrypt(fileName: string, imageData: string) {
    // ImageBuffer => Base64 => Encryption => Decryption (get original Base64)
    this.encryptionService.decrypt(imageData).then( dec => {
      this.decryptedImage = dec || "";
    })
  }

}
