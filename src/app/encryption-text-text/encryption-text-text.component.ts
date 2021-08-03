import { Component } from '@angular/core';
import { EncryptionService, GCM } from '../encryption.service';
import { KeySetManagerService } from '../key-set-manager.service';

const PLAIN_TEXT_CACHE_KEY = "plainText";
const ENCRYPTED_TEXT_CACHE_KEY = "encryptedText";

@Component({
  selector: 'app-encryption-text-text',
  templateUrl: './encryption-text-text.component.html',
  styleUrls: ['./encryption-text-text.component.css']
})
export class EncryptionTextTextComponent {

  plainText?: string;
  encryptedText?: string;

  waitInput: boolean = false;
  waitTimeout: NodeJS.Timeout = setTimeout(() => {}, 0);

  waitDecrypt: boolean = false;

  constructor(
    public encryptionService: EncryptionService,
    public keySetManagerService: KeySetManagerService
  ) { }

  ngOnInit(): void {
    this.readCacheContentFromCache();
  }

  readCacheContentFromCache() {
    new Promise(() => {
      if (localStorage.getItem(PLAIN_TEXT_CACHE_KEY || "")) {
        this.plainText = atob(GCM.urlsafe_unescape(localStorage.getItem(PLAIN_TEXT_CACHE_KEY) as string));
      }
      if (localStorage.getItem(ENCRYPTED_TEXT_CACHE_KEY) || "") {
        this.encryptedText = atob(GCM.urlsafe_unescape(localStorage.getItem(ENCRYPTED_TEXT_CACHE_KEY) as string));
      }
    });
  }

  storeCacheContentToCache(p: string, e: string) {
    new Promise(() => {
      localStorage.setItem(PLAIN_TEXT_CACHE_KEY, GCM.urlsafe_escape(btoa(p)));
      localStorage.setItem(ENCRYPTED_TEXT_CACHE_KEY, GCM.urlsafe_escape(btoa(e)));
    });
  }

  selectKey(keyName: string) {
    this.keySetManagerService.selectKey(keyName);
    this.encrypt(this.plainText || "");
  }

  encrypt(newPlainText: string) {
    this.plainText = newPlainText;
    if (!this.waitInput) {
      console.log("true")
      this.waitInput = true;
    } else {
      clearTimeout(this.waitTimeout);
    }
    this.prepareEncrypt();
  }

  prepareEncrypt() {
    this.waitTimeout = setTimeout(() => {
      console.log("false")
      this.waitInput = false;
      if (this.plainText != "") {
        this.encryptionService.encrypt(this.plainText ?? '').then(enc => {
          this.encryptedText = enc || "";
          this.storeCacheContentToCache(this.plainText || "", this.encryptedText);
        });
      } else {
        this.encryptedText = "";
      }
    }, 300);
  }

  decrypt(newEncryptedText: string) {
    this.plainText = "";
    this.encryptedText = newEncryptedText;
    this.waitDecrypt = true;
    this.encryptionService.decrypt(this.encryptedText ?? '').then(dec => {
      this.plainText = dec || "";
      this.waitDecrypt = false;
      this.storeCacheContentToCache(this.plainText, this.encryptedText || "");
    });
  }

}
