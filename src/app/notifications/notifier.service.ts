import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private readonly _snackBar = inject(MatSnackBar);

  notify(message: string) {
    this._snackBar.open(message, 'OK', { duration: 5000 });
  }
}
