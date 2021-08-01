import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { TSMap } from "typescript-map";
import { GCM } from './encryption.service';
import { RandomService } from './random.service';

const CURRENT_SELECT_COOKIES_KEY = "currentSelect";
const KEY_SETS_COOKIES_KEY = "keySets";

@Injectable({
  providedIn: 'root'
})
export class KeySetManagerService {

  constructor(
    private cookieService: CookieService, 
    private randomService: RandomService) { this.readFromCookies() }

  private keySets = new TSMap<string, string>();
  private currentSelected = "default";

  private updateKeySetsCookies() {
    this.cookieService.put(KEY_SETS_COOKIES_KEY, GCM.urlsafe_escape(btoa(JSON.stringify(this.keySets.toJSON()))));
  }

  private updateCurrentSelectCookies() {
    this.cookieService.put(CURRENT_SELECT_COOKIES_KEY, GCM.urlsafe_escape(btoa(this.currentSelected)));
  }

  private readFromCookies() {
    if (this.cookieService.hasKey(KEY_SETS_COOKIES_KEY)) {
      this.keySets.fromJSON(JSON.parse(atob(GCM.urlsafe_unescape(this.cookieService.get(KEY_SETS_COOKIES_KEY)))));
      if (this.keySets.length > 0) {
        if (this.cookieService.hasKey(CURRENT_SELECT_COOKIES_KEY)) {
          this.currentSelected = atob(GCM.urlsafe_unescape(this.cookieService.get(CURRENT_SELECT_COOKIES_KEY)));
        } else { 
          this.selectDefaultOne(); 
        }
      } else {
        this.selectDefaultOne();
      }
    } else {
      this.selectDefaultOne();
    }
  }

  private selectDefaultOne() {
    if (this.keySets.keys().length > 0) {
      this.selectKey(this.keySets.keys()[0]);
    } else {
      this.addKey("default", this.randomService.generateRandomString(32));
      this.selectDefaultOne();
    }
  }

  public getCurrentKey(): string {
    if (this.keySets.has(this.currentSelected)) {
      return this.getKey(this.currentSelected);
    } else {
      this.selectDefaultOne();
      return this.getCurrentKey();
    }
  }
  
  public hasKey(name: string): boolean {
    return this.keySets.has(name);
  }

  public getCurrentKeyName(): string {
    return this.currentSelected;
  }

  public getKey(name: string): string {
    return this.keySets.get(name) || "";
  }

  public getOptions(): Array<string> {
    return this.keySets.keys();
  }

  public getKeySetDataSource(): KeySetData[] {
    const dataSource: KeySetData[] = []
    this.keySets.map(function(value, key) {
      dataSource.push({name: key || "", key: value})
      return value;
    });
    return dataSource;
  }

  public selectKey(name: string) {
    if (this.keySets.has(name) && name != "") {
      this.currentSelected = name;
      this.updateCurrentSelectCookies();
    } else {
      this.selectDefaultOne();
    }
  }

  public addKey(name: string, key: string) {
    if (!this.keySets.has(name) && name != "" && key != "") {
      this.keySets.set(name, key);
      this.updateKeySetsCookies();
    }
  }

  public delKey(name: string) {
    if (this.keySets.has(name)) {
      this.keySets.delete(name);
      if (this.currentSelected == name) {
        this.selectDefaultOne();
      }
      this.updateKeySetsCookies();
    }
  }

  public editKey(name: string, key: string) {
    if (this.keySets.has(name) && key.length > 0) {
      this.keySets.set(name, key);
      this.updateKeySetsCookies();
    }
  }

}

export interface KeySetData {
  name: string,
  key: string
}