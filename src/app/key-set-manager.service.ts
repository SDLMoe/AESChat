import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { TSMap } from "typescript-map";
import { RandomService } from './random.service';

@Injectable({
  providedIn: 'root'
})

export class KeySetManagerService {

  constructor(private cookieService: CookieService, private randomService: RandomService) { this.readFromCookies() }

  private keySets = new TSMap<string, string>();
  private currentSelected = "default";

  private updateKeySetsCookies() {
    this.cookieService.put("keySets", btoa(JSON.stringify(this.keySets.toJSON())));
  }

  private updateCurrentSelectCookies() {
    this.cookieService.put("currentSelect", btoa(this.currentSelected));
  }

  private readFromCookies() {
    if (this.cookieService.hasKey("keySets")) {
      this.keySets.fromJSON(JSON.parse(atob(this.cookieService.get("keySets"))));
      if (this.cookieService.hasKey("currentSelect")) {
        this.currentSelected = atob(this.cookieService.get("currentSelect"));
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

  public selectKey(name: string) {
    if (this.keySets.has(name)) {
      this.currentSelected = name;
      this.updateCurrentSelectCookies();
    } else {
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

  public addKey(name: string, key: string) {
    if (!this.keySets.has(name)) {
      this.keySets.set(name, key);
      this.updateKeySetsCookies();
    }
  }

  public delKey(name: string) {
    if (this.keySets.has(name)) {
      this.keySets.delete(name);
      this.updateKeySetsCookies();
    }
  }

}

export interface KeySetData {
  name: string,
  key: string
}