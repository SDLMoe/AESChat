import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'cookie',
  template: `
  <div>
    <button id="setCookieButton"
            (click)="setCookies()">
      Set cookies
    </button>
    <p></p>
    <button id="getCookieButton"
          (click)="getCookies()">
      Get cookies
    </button>
  </div>
  `
})
export class cookieComponent {
  title = 'test-app';
  cookieValue!: string;
  objectCookieValue?: object;
  hasCookieTrue!: boolean;
  hasCookieFalse!: boolean;

  private key = 'myCookie';
  private objectKey = 'myObjectCookie';

  constructor(private cookieService: CookieService) {}

  setCookies(): void {
    this.cookieService.put(this.key, 'myValue');
    this.cookieService.putObject(this.objectKey, {myKey: 'myValue'});
  }

  getCookies(): void {
    this.cookieValue = this.cookieService.get(this.key);
    this.objectCookieValue = this.cookieService.getObject(this.objectKey);
    this.hasCookieTrue = this.cookieService.hasKey(this.key) && this.cookieService.hasKey(this.objectKey);
    this.hasCookieFalse = this.cookieService.hasKey('nonExistentKey');
  }

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