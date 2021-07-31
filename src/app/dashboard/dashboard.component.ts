import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie';
import { Console } from 'console';

@Component({
  selector: 'cookie',
  template: `
  <div>
    <button id="setCookieButton"
            (click)="setCookies()">
      Save
    </button>
    <p></p>
    <button id="getCookieButton"
          (click)="getCookies()">
      echo
    </button>
    <button id="delCookieButton"
          (click)="delCookies()">
      Delete
    </button>
  </div>
  `
})
export class cookieComponent {
  cookieValue!: string;
  objectCookieValue?: object;
  hasCookieTrue!: boolean;
  hasCookieFalse!: boolean;

  private cookie = 'myCookie';


  setCookies(): void {
    this.cookieService.put(this.cookie, 'myValue');
    console.log("cookie set.");
  }

  getCookies(): void {
    // this.cookieValue = this.cookieService.get(this.cookie);
    // this.hasCookieTrue = this.cookieService.hasKey(this.cookie);
    // this.hasCookieFalse = this.cookieService.hasKey('nonExistentKey');
    console.log(this.cookie);
    console.log(this.cookieService.get(this.cookie));
    console.log(this.cookieService.hasKey(this.cookie));
    console.log(this.cookieService.hasKey('nonExistentKey'));
  }

  delCookies():void{
    this.cookieService.remove(this.cookie);
    if(this.cookieService.hasKey(this.cookie)){
      console.log("cookie exist.");
    } else {
      console.log("cookie deleted.");
    };
  }

  constructor(private cookieService: CookieService) {}
}

@Component({
  selector: 'setName',
  template: `
  <mat-form-field>
    <mat-label>Name</mat-label>
    <input matInput 
      type="text" 
      #box (keyup.enter)="onEnter(box.value)">
  </mat-form-field>
  <p>{{value}}</p>
  `
})
export class setNameComponent {
  value = '';
  onEnter(value: string) { this.value = value; }
}

@Component({
  selector: 'setKey',
  template: `
    <mat-form-field>
      <mat-label>Key</mat-label>
      <input matInput type="text" maxlength="32"
        placeholder="12345678901234561234567890123456"
        #box (keyup.enter)="onEnter(box.value)">
    </mat-form-field>
    <p>{{value}}</p>
  `
})
export class setKeyComponent {
  value = '';
  onEnter(value: string) { this.value = value; }
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