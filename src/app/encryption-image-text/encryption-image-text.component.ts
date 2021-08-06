import { Component, OnInit } from '@angular/core';
import { AnimationTools } from '../animation/AnimationTools';
import { EncryptionService, GCM } from '../encryption.service';
import { KeySetManagerService } from '../key-set-manager.service';
import { SnackbarService } from '../snackbar.service';
import { RandomService } from '../random.service';
import { Buffer } from 'buffer'

const IMAGE_CACHE_INFO_CACHE_KEY = "imageCacheInfo";

@Component({
  selector: 'app-encryption-image-text',
  templateUrl: './encryption-image-text.component.html',
  styleUrls: ['./encryption-image-text.component.css'],
  animations: [
    AnimationTools.fadeInOut(0.3)
  ]
})
export class EncryptionImageTextComponent implements OnInit {

  constructor(
    public snackBarService: SnackbarService,
    public encryptionService: EncryptionService,
    public keySetManagerService: KeySetManagerService,
    public randomService: RandomService,
  ) { }

  decryptedImage = "";
  cacheIdentity = "";
  openViewer = false;
  cacheWarn = false;

  isEncrypting = false;
  isDecrypting = false;

  ngOnInit(): void {
    this.readCacheContentFromCache();
  }

  readCacheContentFromCache() {
    new Promise(
      () => {
        if (localStorage.getItem(IMAGE_CACHE_INFO_CACHE_KEY) || "") {
          this.cacheIdentity =
            Buffer.from(GCM.urlsafe_unescape
              (localStorage.getItem
                (IMAGE_CACHE_INFO_CACHE_KEY) as string), 'base64').toString('utf16le');
          this.decryptedImage = localStorage[this.cacheIdentity];
          this.cacheWarn = true;
          if (this.decryptedImage != "") {
            setTimeout(() => { this.openViewer = true }, 200);
          }
        }
      }
    );
  }

  storeCacheContentToCache() {
    new Promise(() => {
      this.cacheIdentity = this.decryptedImage.slice(0, 64);
      localStorage.setItem(IMAGE_CACHE_INFO_CACHE_KEY,
        GCM.urlsafe_escape
          (Buffer.from(this.cacheIdentity, 'utf16le').toString('base64')));
      if (this.decryptedImage != "") {
        // console.log("cacheIdentity: " + this.cacheIdentity)
        localStorage[this.cacheIdentity] = this.decryptedImage;
      }
    });
  }

  cacheDecryption(enc: string, dec: string) {
    new Promise(() => {
      const encIdentity = enc.slice(0, 64);
      const decIdentity = dec.slice(0, 64);
      localStorage[encIdentity] = decIdentity;
      localStorage[this.cacheIdentity] = this.decryptedImage;
    });
  }

  getCacheDecryption(enc: string): string | null {
    const encIdentity = enc.slice(0, 64);
    if (localStorage[encIdentity] != null && localStorage[encIdentity] != "") {
      return localStorage[localStorage[encIdentity]];
    }
    return null;
  }



  encrypt(fileName: string, imageBuffer: ArrayBuffer) {
    var getFileExtension = fileName.split('.').pop()
    this.isEncrypting = true;
    this.encryptionService.encrypt(GCM.arrayBufferToBase64(imageBuffer)).then(enc => {
      if (enc != null && enc != "") {
        let saveData = (
          function () {
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            return function (data: string, fileName: string) {
              let blob = new Blob([data]),
                url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = fileName as string;
              a.click();
              window.URL.revokeObjectURL(url);
            };
          }
            ()
        );
        //TODO: Provide Option
        saveData(enc,
          this.randomService.generateRandomName()
          + "-encrypted."
          + getFileExtension
        );
        this.isEncrypting = false;
      }
    });
  }

  decrypt(fileName: string, imageData: string) {
    // ImageBuffer => Base64 => Encryption => Decryption (get original Base64)
    fileName = fileName.split('.').pop() as string;
    this.isDecrypting = true;
    const cache = this.getCacheDecryption(imageData)
    if (cache != null) {
      this.decrypted(cache);
      this.isDecrypting = false;
      this.cacheWarn = true;
      return;
    }
    this.encryptionService.decrypt(imageData).then
      (dec => {
        this.isDecrypting = false;
        if (dec != null && dec != "") {
          this.decrypted(dec);
          this.cacheWarn = false;
          this.cacheDecryption(imageData, dec);
        } else {
          this.snackBarService.openAlertSnackBar("Maybe the key is wrong!");
        }
      });
  }

  decrypted(imageData: string) {
    // console.log(getFileExtension)
    if (this.decryptedImage != "") {
      this.changeImage(imageData);
    } else {
      this.newImage(imageData);
    }
  }

  changeImage(imageData: string) {
    this.openViewer = false;
    setTimeout(() => {
      this.decryptedImage = imageData || "";
      this.storeCacheContentToCache();
      setTimeout(() => { this.openViewer = true }, 200);
    }, 300);
  }

  newImage(imageData: string) {
    this.decryptedImage = imageData;
    if (this.decryptedImage != "") {
      this.storeCacheContentToCache();
      setTimeout(() => { this.openViewer = true }, 200);
    } else {
      this.snackBarService.openAlertSnackBar("Maybe the key is wrong!");
    }
  }

  // saveDecrypted() {
  //   let saveData = (
  //     function () {
  //       let a = document.createElement("a");
  //       document.body.appendChild(a);
  //       a.setAttribute("style", "display: none");
  //       return function (data: string, fileName: string) {
  //         let blob = new Blob([data]),
  //           url = window.URL.createObjectURL(blob);
  //         a.href = url;
  //         a.download = fileName as string;
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //       };
  //     }
  //       ()
  //   );
  //   saveData(
  //     Buffer.from(this.decryptedImage, 'base64').
  //       toString('utf16le'),
  //     this.randomService.generateRandomName()
  //     + "-decrypted.png"
  //      + this.decrypt.fileName
  //   );

  // }

  clearImage() {
    this.openViewer = false;
    new Promise(() => {
      setTimeout(() => {
        this.decryptedImage = "";
        this.storeCacheContentToCache();
      }, 300);
    });
  }

}

interface ClipboardItem {
  readonly types: string[];
  readonly presentationStyle: "unspecified" | "inline" | "attachment";
  getType(): Promise<Blob>;
}

interface ClipboardItemData {
  [mimeType: string]: Blob | string | Promise<Blob | string>;
}

declare var ClipboardItem: {
  prototype: ClipboardItem;
  new(itemData: ClipboardItemData): ClipboardItem;
};
