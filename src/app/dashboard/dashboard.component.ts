import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'setName',
  template: `
<form class="dashboard-name-config">
  <mat-form-field>
    <mat-label>Name</mat-label>
    <input matInput 
      type="text" 
      #box (keyup.enter)="onEnter(box.value)">
  </mat-form-field>
  <p>{{value}}</p>
</form>
  `
})
export class setNameComponent {
  value = '';
  onEnter(value: string) { this.value = value; }
}

@Component({
  selector: 'setKey',
  template: `
  <form class="dashboard-key-config">
    <mat-form-field>
      <mat-label>Key</mat-label>
      <input matInput type="text" maxlength="32"
        placeholder="12345678901234561234567890123456"
        #box (keyup.enter)="onEnter(box.value)">
    </mat-form-field>
    <p>{{value}}</p>
  </form>
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
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 2, rows: 1 },
        { title: 'Card 3', cols: 2, rows: 1 },
        { title: 'Card 4', cols: 2, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
