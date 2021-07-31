import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie';

//generate random key using crypto.getRandomValues
const crypto = window.crypto;
function dec2hex (dec: { toString: (arg0: number) => string; }) {
  return dec.toString(36).padStart(2, "0")
}
function generateId (len: number) {
  let arr = new Uint8Array(len/2)
  crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

@Component({
  selector: 'cookie',
  template: `
  <div>
  <button id="delCookieButton"
          (click)="randomKey()">
      Random a key
    </button>
    <button id="delCookieButton"
          (click)="delCookies()">
      Delete
    </button>
  </div>
  `
})
export class cookieComponent {
  private name = 'name'; //cookie name
  private key = 'key';//cookie
  private keyLength:number = 32

  randomKey(){
    this.cookieService.put("key", generateId(this.keyLength));
    console.log(this.cookieService.get(this.key));
    location.reload();
  }
  
  delCookies():void{
    this.cookieService.put(this.name, '');
    if(this.cookieService.hasKey(this.name) == true){
      console.log("name deleted.");
    };

    this.cookieService.put(this.key, '');
    if(this.cookieService.hasKey(this.key) == true){
      console.log("key deleted.");
    };

  }

  constructor(private cookieService: CookieService) {}
}

@Component({
  selector: 'setName',
  template: `
  <div class="dashboard-name-config">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput 
          type="text" [(ngModel)]="value"
          #box (keyup.enter)="onEnter(box.value)">
      </mat-form-field>
        <button mat-button *ngIf="value" matSuffix mat-icon-button aria-label="Clear" (click)="value=''">
        <mat-icon>close</mat-icon>
        </button>
    <mat-card-subtitle>{{this.cookieService.get("name")}}</mat-card-subtitle>
  </div>
  `
})
export class setNameComponent {
  value = '';
  onEnter(value: string) { 
    this.value = value; 
    this.cookieService.put("name", this.value);
    console.log(this.cookieService.get("name"));
    console.log("name set.");
  }
  constructor(public cookieService: CookieService) {}
}

@Component({
  selector: 'setKey',
  template: `
  <div class="dashboard-key-config">
    <mat-form-field>
      <mat-label>Key</mat-label>
        <input matInput type="text" maxlength="32" [(ngModel)]="value"
        placeholder="12345678901234561234567890123456"
        #box (keyup.enter)="onEnter(box.value)">
    </mat-form-field>
    <button mat-button *ngIf="value" matSuffix mat-icon-button aria-label="Clear" (click)="value=''">
      <mat-icon>close</mat-icon>
    </button>
    <mat-card-subtitle>
      (Requied by 32 bytes) &nbsp;  &nbsp;  &nbsp;  &nbsp; 
      {{this.cookieService.get("key").length}}
      <br><br>
      {{this.cookieService.get("key")}}
    </mat-card-subtitle>
  </div>
  `
})
export class setKeyComponent {
  value = '12345678901234561234567890123456';
  onEnter(value: string) { 
    this.value = value;
    this.cookieService.put("key", this.value);
    console.log(this.cookieService.get("key"));
    console.log("key set.");
    location.reload();
  }
  constructor(public cookieService: CookieService) {}
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      // if (matches) {
      //   return [
      //     { title: 'Card 1', cols: 1, rows: 1 },
      //     { title: 'Card 2', cols: 1, rows: 1 },
      //     { title: 'Card 3', cols: 1, rows: 1 },
      //     { title: 'Card 4', cols: 1, rows: 1 }
      //   ];
      // }

      return [
        // { title: 'Card 1', cols: 2, rows: 1 },
        // { title: 'Card 2', cols: 2, rows: 1 },
        // { title: 'Card 3', cols: 2, rows: 1 },
        { title: 'Card 4', cols: 2, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}