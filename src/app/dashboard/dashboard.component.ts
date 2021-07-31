import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'cookie',
  template: `
  <div>
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

  // setCookies(): void {
  //   this.cookieService.put(this.name, this.key);
  //   console.log("cookie set.");
  // }

  // getCookies(): void {
  //   // this.cookieValue = this.cookieService.get(this.cookie);
  //   // this.hasCookieTrue = this.cookieService.hasKey(this.cookie);
  //   // this.hasCookieFalse = this.cookieService.hasKey('nonExistentKey');
  //   console.log(this.name);
  //   console.log(this.cookieService.get(this.name));
  //   console.log(this.cookieService.hasKey(this.name));
  //   console.log(this.cookieService.hasKey('nonExistentKey'));
  // }

  delCookies():void{
    this.cookieService.remove(this.name);
    if(this.cookieService.hasKey(this.name)){
      console.log("name exist.");
    } else {
      console.log("name deleted.");
    };

    this.cookieService.remove(this.key);
    if(this.cookieService.hasKey(this.key)){
      console.log("key exist.");
    } else {
      console.log("key deleted.");
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
  <p>{{this.cookieService.get("name")}}</p>
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
    <mat-form-field>
      <mat-label>Key</mat-label>
      <input matInput type="text" maxlength="32"
        placeholder="12345678901234561234567890123456"
        #box (keyup.enter)="onEnter(box.value)">
    </mat-form-field>
    <p>{{this.cookieService.get("key")}}</p>
  `
})
export class setKeyComponent {
  value = '';
  onEnter(value: string) { 
    this.value = value; 
    this.cookieService.put("key", this.value);
    console.log(this.cookieService.get("key"));
    console.log("key set.");
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