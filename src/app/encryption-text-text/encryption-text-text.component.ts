import { Component } from '@angular/core';
import { EncryptionService, GCM } from '../encryption.service';
import { KeySetManagerService } from '../key-set-manager.service';
import { SnackbarService } from '../snackbar.service';
import { CacheEncoder } from '../utils/cache-encoder';

const PLAIN_TEXT_CACHE_KEY = "plainText";
const ENCRYPTED_TEXT_CACHE_KEY = "encryptedText";
const ENCRYPTED_IDENTIFIER = "[@]";

@Component({
  selector: 'app-encryption-text-text',
  templateUrl: './encryption-text-text.component.html',
  styleUrls: ['./encryption-text-text.component.css']
})
export class EncryptionTextTextComponent {

  plainText?: string;
  encryptedText?: string;

  waitInput: boolean = false;
  waitTimeout: NodeJS.Timeout = setTimeout(() => { }, 0);

  waitDecrypt: boolean = false;

  clipboardPermission: boolean = false;
  lastFocus = true;

  listenFocus: NodeJS.Timeout = setInterval(() => {
    if (document.hasFocus() !== this.lastFocus && document.hasFocus()) {
      setTimeout(() => {
        this,this.readEncryptedTextFromClipboard();
      }, 500);
    }
    this.lastFocus = document.hasFocus();
  }, 300);

  constructor(
    public encryptionService: EncryptionService,
    public keySetManagerService: KeySetManagerService,
    public snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.readCacheContentFromCache();
    let anyNavigator: any;
    anyNavigator = window.navigator;
    const permissionName = "clipboard-write" as PermissionName;
    (anyNavigator.permissions.query({ name: permissionName }) as Promise<any>).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        this.clipboardPermission = true;
      }
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.listenFocus);
  }

  readEncryptedTextFromClipboard() {
    if (this.clipboardPermission) {
      new Promise(async () => {
        try {
          let anyNavigator: any;
          anyNavigator = window.navigator;
          (anyNavigator.clipboard.readText() as Promise<string>).then(enc => {
            if (enc.startsWith(ENCRYPTED_IDENTIFIER) && enc != this.encryptedText) {
              this.snackbarService.openAlertSnackBar("Get encrypted text from clipboard!")
              this.decrypt(enc);
            }
          });
        } catch (e) { }
      });
    }
  }

  readCacheContentFromCache() {
    new Promise(() => {
      if (localStorage.getItem(PLAIN_TEXT_CACHE_KEY || "")) {
        this.plainText = CacheEncoder.decode(localStorage.getItem(PLAIN_TEXT_CACHE_KEY) || "");
      }
      if (localStorage.getItem(ENCRYPTED_TEXT_CACHE_KEY) || "") {
        this.encryptedText = CacheEncoder.decode(localStorage.getItem(ENCRYPTED_TEXT_CACHE_KEY) || "");
      }
    });
  }

  storeCacheContentToCache(p: string, e: string) {
    new Promise(() => {
      localStorage.setItem(PLAIN_TEXT_CACHE_KEY, CacheEncoder.encode(p));
      localStorage.setItem(ENCRYPTED_TEXT_CACHE_KEY, CacheEncoder.encode(e));
    });
  }

  selectKey(keyName: string) {
    this.keySetManagerService.selectKey(keyName);
    this.encrypt(this.plainText || "");
  }

  encrypt(newPlainText: string) {
    this.plainText = newPlainText;
    if (!this.waitInput && newPlainText != "") {
      this.waitInput = true;
    } else {
      clearTimeout(this.waitTimeout);
    }
    this.prepareEncrypt();
  }

  prepareEncrypt() {
    this.waitTimeout = setTimeout(() => {
      this.waitInput = false;
      if (this.plainText != "") {
        this.encryptionService.encrypt(this.plainText ?? '').then(enc => {
          this.encryptedText = ENCRYPTED_IDENTIFIER + enc || "";
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
    if (newEncryptedText.startsWith(ENCRYPTED_IDENTIFIER)) {
      this.waitDecrypt = true;
      this.encryptionService.decrypt(this.encryptedText?.replace(ENCRYPTED_IDENTIFIER, '') ?? '').then(dec => {
        this.plainText = dec || "";
        this.waitDecrypt = false;
        this.storeCacheContentToCache(this.plainText, this.encryptedText || "");
      });
    }
  }

}