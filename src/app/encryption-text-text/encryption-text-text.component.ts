import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { EncryptionService, GCM } from '../encryption.service';
import { KeySetManagerService } from '../key-set-manager.service';

const PLAIN_TEXT_COOKIES_KEY = "plainText";
const ENCRYPTED_TEXT_COOKIES_KEY = "encryptedText";

@Component({
  selector: 'app-encryption-text-text',
  templateUrl: './encryption-text-text.component.html',
  styleUrls: ['./encryption-text-text.component.css']
})
export class EncryptionTextTextComponent {

  plainText ?: string;
  encryptedText ?: string;

  constructor(
    public encryptionService: EncryptionService, 
    public keySetManagerService:KeySetManagerService,
    public cookieService: CookieService) {}

  ngOnInit(): void {
    this.readCacheContentFromCookie();
  }

  readCacheContentFromCookie() {
    new Promise(() => {
      if (this.cookieService.hasKey(PLAIN_TEXT_COOKIES_KEY)) {
        this.plainText = atob(GCM.urlsafe_unescape(this.cookieService.get(PLAIN_TEXT_COOKIES_KEY)));
      }
      if (this.cookieService.hasKey(ENCRYPTED_TEXT_COOKIES_KEY)) {
        this.encryptedText = atob(GCM.urlsafe_unescape(this.cookieService.get(ENCRYPTED_TEXT_COOKIES_KEY)));
      }
    });
  }

  storeCacheContentToCookie(p: string, e: string) {
    new Promise(() => {
      this.cookieService.put(PLAIN_TEXT_COOKIES_KEY, GCM.urlsafe_escape(btoa(p)));
      this.cookieService.put(ENCRYPTED_TEXT_COOKIES_KEY, GCM.urlsafe_escape(btoa(e)));
    });
  }

  selectKey(keyName: string) {
    this.keySetManagerService.selectKey(keyName);
    this.encrypt(this.plainText || "");
  }

  encrypt(newPlainText: string) {
    this.plainText = newPlainText;
    if (newPlainText != "") {
      this.encryptionService.encrypt(this.plainText ?? '').then(enc => {
        this.encryptedText = enc || "";
        this.storeCacheContentToCookie(this.plainText || "", this.encryptedText);
      });
    } else {
      this.encryptedText = "";
    }
  }

  decrypt(newEncryptedText: string) {
    this.plainText = "";
    this.encryptedText = newEncryptedText;
    this.encryptionService.decrypt(this.encryptedText ?? '').then(dec => {
      this.plainText = dec || "";
      this.storeCacheContentToCookie(this.plainText, this.encryptedText || "");
    });
  }

}
