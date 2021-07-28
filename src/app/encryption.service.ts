import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class EncryptionService {

  private initKey = "12345678901234561234567890123456";
  private keySize = 256;

  private key = CryptoJS.enc.Utf8.parse("12345678901234561234567890123456");
  //key (keysize/8 byte)

  private iv = CryptoJS.enc.Utf8.parse("1234567890123456");
  //iv 16 byte

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
      iv: this.iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.NoPadding
    });
    const base64Cipher = cipher.ciphertext.toString(CryptoJS.enc.Base64);
    const resultCipher = base64Cipher.replace(/\+/g,'-').replace(/\//g,'_');
    return resultCipher;
  }
  
  decrypt(encrypted: string): string {
    const restoreBase64 = encrypted.replace(/\-/g,'+').replace(/_/g,'/');
    const decipher = CryptoJS.AES.decrypt(restoreBase64, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.NoPadding
    });
    const resultDecipher = CryptoJS.enc.Utf8.stringify(decipher);
    return resultDecipher;
  }
  
  encryptImage() {
   
  }
  
  
}