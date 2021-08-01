import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { KeySetManagerService } from '../key-set-manager.service';
import { RandomService } from '../random.service';

@Component({
  selector: 'button-del-cookie',
  templateUrl: './button-del-cookie.html',
  styleUrls: ['./dashboard.component.css']
})
export class ButtonDelCookieComponent {
  private name = 'name'; //cookie name
  private key = 'key';//cookie
  private randomkeyLength:number = 32

  randomKey(){
    this.cookieService.put("key", this.randomService.generateRandomString(this.randomkeyLength));
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

  constructor(private cookieService: CookieService, private randomService: RandomService) {}
}

@Component({
  selector: 'input-name',
  templateUrl: './input-name.html',
  styleUrls: ['./dashboard.component.css']
})
export class InputNameComponent {
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
  selector: 'input-key',
  templateUrl: './input-key.html',
  styleUrls: ['./dashboard.component.css']
})
export class InputKeyComponent {
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
  
  displayedCol = ['name', 'key'];

  constructor(public keySetManagerService: KeySetManagerService) { console.log(keySetManagerService.getKeySetDataSource())}

}