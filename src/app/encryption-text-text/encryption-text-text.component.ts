import { Component } from '@angular/core';
import { EncryptionService } from '../encryption.service';

@Component({
  selector: 'app-encryption-text-text',
  templateUrl: './encryption-text-text.component.html',
  styleUrls: ['./encryption-text-text.component.css']
})
export class EncryptionTextTextComponent {

  plainText ?: string;
  encryptedText ?: string;

  constructor(public encryptionService: EncryptionService) {}

  ngOnInit(): void {
    
  }

  encrypt(newPlainText: string) {
    this.plainText = newPlainText;
    this.encryptedText = this.encryptionService.encrypt(this.plainText ?? '')
  }

  decrypt(newEncryptedText: string) {
    this.encryptedText = newEncryptedText;
    this.plainText = this.encryptionService.decrypt(this.encryptedText ?? '');
  }

}
