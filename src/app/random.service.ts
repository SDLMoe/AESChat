import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() { }

  dec2hex (dec: { toString: (arg0: number) => string; }) {
    return dec.toString(36).padStart(2, "0")
  }

  generateRandomString (len: number) {
    let arr = new Uint8Array(len/2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, this.dec2hex).join('')
  }

}
