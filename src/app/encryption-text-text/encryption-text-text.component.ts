import { Component, Output } from '@angular/core';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-encryption-text-text',
  templateUrl: './encryption-text-text.component.html',
  styleUrls: ['./encryption-text-text.component.css']
})
export class EncryptionTextTextComponent {

  plainText ?: string;
  encryptedText ?: string;

  constructor(public snackbarService: SnackbarService) {}

  ngOnInit(): void {
  }

}
