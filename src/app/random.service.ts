import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  public dec2hex (dec: { toString: (arg0: number) => string; }) {
    return dec.toString(36).padStart(8, "0")
  }

  public generateRandomStringWithCrypto (len: number) {
    let arr = new Uint32Array(len/4)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, this.dec2hex).join('')
  }

  public generateRandomString(e: number): string {
    let outString: string = '';
    let inOptions: string = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789';
    for (let i = 0; i < e; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    return outString;
  }

  constructor() { }

}
