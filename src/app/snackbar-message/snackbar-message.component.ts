import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-message',
  templateUrl: './snackbar-message.component.html',
  styleUrls: ['./snackbar-message.component.css']
})
export class SnackbarMessageComponent implements OnInit {
  
  constructor(@Inject(MAT_SNACK_BAR_DATA) public injectedMessage ?: string) { }

  ngOnInit(): void {
  }

}
