import { Injectable } from '@angular/core';
import { KeySetManagerService } from './key-set-manager.service';

@Injectable({
  providedIn: 'root'
})


export class EncryptionService {

  private key = ""

  constructor(private keySetManagerService: KeySetManagerService) {
    this.updateKey();
  }

  public updateKey() {
    this.key = this.keySetManagerService.getCurrentKey();
  }


  public encrypt(data: string): Promise<string | null> {
    this.updateKey();
    let gcm = new GCM(this.key);
    let base64Cipher = gcm.encrypt(data);
    return base64Cipher;
  }

  public decrypt(encrypted: string): Promise<string | null> {
    this.updateKey();
    let gcm = new GCM(this.key);
    return gcm.decrypt(encrypted);
  }



}

class GCM {

  private password: string = "";
  private ivLength: number = 16;
  private saltLength: number = 12;


  /**
   * @param password {string} password string, will use PBKDF2 to drive encryption key.
   * @param options  {object} optional algorithm parameters.
   *          specific this parameter to custom your own encryption algorithm.
*              {algorithm: <string. Encrypto algorithm, can be aes-1228-gcm, aes-192-gcm or aes-256-gcm>,
   *           saltLength: <integer. key salt length, default 64.>
   *           pbkdf2Rounds: <integer. PBKDF2 rounds, default 10000. Use large value to slow pbkdf2>,
   *           pbkdf2Digest: <string. PBKDF2 digest algorithm, default is sha512>
   */
  constructor(password: string) {
    this.password = password;
  }

  /*
  Get some key material to use as input to the deriveKey method.
  The key material is a password supplied by the user.
  */
  static getKeyMaterial(password: string): Promise<CryptoKey> {
    const enc = new TextEncoder();
    return window.crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
  }

  /*
  Given some key material and some random salt
  derive an AES-GCM key using PBKDF2.
  */
  static getKey0(keyMaterial: CryptoKey, salt: Uint8Array): Promise<CryptoKey> {
    return window.crypto.subtle.deriveKey(
      {
        "name": "PBKDF2",
        salt: salt,
        "iterations": 100000,
        "hash": "SHA-256"
      },
      keyMaterial,
      { "name": "AES-GCM", "length": 256 },
      true,
      ["encrypt", "decrypt"]
    );
  }

  static async getKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    let keyMaterial = await this.getKeyMaterial(password);
    return this.getKey0(keyMaterial, salt);
  }

  static getTextEncoding(text: string): Uint8Array {
    let enc = new TextEncoder();
    return enc.encode(text);
  }

  static getTextDecoding(encoded: ArrayBuffer): string {
    let enc = new TextDecoder();
    return enc.decode(encoded);
  }

  static urlsafe_escape(data: string) {
    // / => _
    // + -> .
    // = => -
    return data.replace(/\//g, '_').replace(/\+/g, '.').replace(/=/g, '-');
  }

  static urlsafe_unescape(data: string) {
    return data.replace(/_/g, '/').replace(/\./g, '+').replace(/-/g, '=');
  }

  static appendBuffer(buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
    let tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp;
  }

  static arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  static base64ToArrayBuffer(data: string): ArrayBuffer {
    let raw = window.atob(data);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  /**
   * Encrypt plainText.
   *
   * The output raw buffer format:
   *
   *   <salt(12bytes)> <iv(64bytes)> <authTag(16bytes)> <encryptedData>
   *
   * it will be url safe base64 encoded as function return value.
   *
   * @param plainText  utf-8 encoded plain text.
   * @returns {string} url safe base64 encoded encrypted text.
   */
  async encrypt(plainText: string) {

    try {
      // Generates cryptographically strong pseudo-random data. The size argument is a number indicating the number of bytes to generate.
      let iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
      let salt = crypto.getRandomValues(new Uint8Array(this.saltLength));
      let key = await GCM.getKey(this.password, salt);

      let cipher = await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv
        },
        key,
        GCM.getTextEncoding(plainText)
      );
      return GCM.urlsafe_escape(GCM.arrayBufferToBase64(GCM.appendBuffer(GCM.appendBuffer(salt, iv), cipher)));
    } finally { };
  }

  /**
   * decrypt encyptedData.
   *
   * @param encryptedData {string} encrypted data, url safe base64 encoded.
   * @returns {*} decrypted data, utf-8 encoded. or null if decrypt failed.
   */
  async decrypt(encryptedData: string) {
    try {
      let rawData = new Uint8Array(GCM.base64ToArrayBuffer(GCM.urlsafe_unescape(encryptedData)));

      // convert data to buffers
      let salt = rawData.slice(0, this.saltLength);
      let iv = rawData.slice(this.saltLength, this.saltLength + this.ivLength);
      let data = rawData.slice(this.saltLength + this.ivLength);
      let key = await GCM.getKey(this.password, salt);
      let decipher = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv
        },
        key,
        data
      );

      let plainText = GCM.getTextDecoding(decipher);
      return plainText;
    } finally { }

    return null;
  }

}