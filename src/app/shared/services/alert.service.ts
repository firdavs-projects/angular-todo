import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {config} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
