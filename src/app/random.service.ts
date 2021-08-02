import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  public randomNum(minNum: number, maxNum: number) {
    switch (arguments.length) {
      case 1:
        return parseInt(String(Math.random() * minNum + 1));
      case 2:
        return parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum));
      default:
        return 0;
    }
  }

  public dec2hex(dec: { toString: (arg0: number) => string; }) {
    let generate = String(window.crypto.getRandomValues(new Uint8Array(1)))
    let e = dec.toString(36).padStart(2, generate)
    return e
  }

  public generateRandomKey() {
    let len = 64
    let arr = new Uint8Array(len / 2)
    window.crypto.getRandomValues(arr)
    let e = Array.from(arr, this.dec2hex).join('')
    return e
  }

  public generateRandomName(): string {
    let len = this.randomNum(100, 200);
    let arr = new Uint8Array(len / 50)
    window.crypto.getRandomValues(arr)
    let e = Array.from(arr, this.dec2hex).join('')
    return e
  }

  constructor() { }
}
