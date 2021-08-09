import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  randomNum(min: number, max: number) {
    let randomBuffer: Uint32Array = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    let random = randomBuffer[0] / (0xFFFFFFFF + 1)
    switch (arguments.length) {
      case 1:
        return parseInt(String(random * min + 1));
      case 2:
        return parseInt(String(random * (max - min + 1) + min));
      default:
        return 0;
    }
  }

  public generateRandomKey(len: number): string {
    let outString: string = '';
    let inOptions: string = 'sXdERFvwnx1p34SDkbeafC6W7UK2HMVyZlL9tmiqPcJYNIjOG5g8rhQBuTAoz0';
    //ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
    for (let i = 0; i < len; i++) {
      let randomBuffer: Uint32Array = new Uint32Array(1);
      window.crypto.getRandomValues(randomBuffer);
      let digits = Math.floor(randomBuffer[0] / (0xFFFFFFFF + 1) * inOptions.length)
      outString += inOptions.charAt(digits);
    }
    return outString;
  }

  public generateRandomName(): string {
    let e = this.generateRandomKey(8).substring(0, this.randomNum(3,8))
    console.log(this.randomNum(4,8))
    return e
  }

  constructor() { }
}
