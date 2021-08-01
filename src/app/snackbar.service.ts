import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarMessageComponent } from './snackbar-message/snackbar-message.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, duration?: number, action?: string) {
    if (duration === undefined) {
      duration = 3000
    }
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }
  
  openAlertSnackBar(message: string, duration?: number) {
    if (duration === undefined) {
      duration = 3000
    }
    this.snackBar.openFromComponent(SnackbarMessageComponent, {
      duration: duration,
      data: message,
      horizontalPosition: "center",
      verticalPosition: "bottom",
    });
  }

}
