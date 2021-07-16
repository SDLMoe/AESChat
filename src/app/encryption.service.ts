import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private initKey = "default";
  private keySize = 128;

  private key = CryptoJS.enc.Utf8.parse("");

  constructor() { }

  
  public set setKey(newKey : string) {
    this.initKey = newKey
    this.fillKey()
  }

  public fillKey() {
    const filledKey = Buffer.alloc(this.keySize / 8);
    const keys = Buffer.from(this.initKey);
    let index = 0;
    while (index < filledKey.length) {
      filledKey[index] = keys[index];
      index += 1;
    }
    this.key = CryptoJS.enc.Utf8.parse(filledKey.toString());
  }
  

  encrypt(data: string): string {
    const cipher = CryptoJS.AES.encrypt(data,this.key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    const base64Cipher = cipher.ciphertext.toString(CryptoJS.enc.Base64);
    const resultCipher = base64Cipher.replace(/\+/g,'-').replace(/\//g,'_');
    return resultCipher;
  }
  
  decrypt(encrypted: string): string {
    const restoreBase64 = encrypted.replace(/\-/g,'+').replace(/_/g,'/');
    const decipher = CryptoJS.AES.decrypt(restoreBase64, this.key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    const resultDecipher = CryptoJS.enc.Utf8.stringify(decipher);
    return resultDecipher;
  }
  
  encryptImage() {
   
  }
  
  
}
