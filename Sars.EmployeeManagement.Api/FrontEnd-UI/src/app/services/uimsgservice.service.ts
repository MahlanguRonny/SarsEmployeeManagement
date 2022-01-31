import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../shared/dialogs/confirm/confirm.component';
import { PleasewaitComponent } from '../shared/dialogs/pleasewait/pleasewait.component';

@Injectable({
  providedIn: 'root'
})
export class UimsgserviceService {

  protected pleaseWaitDialogRef: any;
  //public opened: boolean;
  // protected _confirmResult: Observable<boolean>;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
  }


  snack(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: 'style-success'
    });
  }

  toast(message: string) {
    this.snackBar.open(message, 'close', {
      politeness: 'assertive',
      panelClass: 'red-snackbar',
      duration: 5000
    });
  }

  async confirm(message: string, title?: string): Promise<boolean> {
    const confirmDialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      data: {
        message: message,
        title: title || 'Confirm?'
      }
    });

    const result = await confirmDialogRef.afterClosed().toPromise<boolean>();
    return Promise.resolve(!!result);
  }

  showLoading(title?: string): void {
    this.hideLoading();
    //this.opened = true;
    this.pleaseWaitDialogRef = this.dialog.open(PleasewaitComponent, {
      disableClose: true,
      data: { title: title || 'Loading...' }
    });
  }

  hideLoading(): void {
    if (this.pleaseWaitDialogRef) {
      this.pleaseWaitDialogRef.close();
      this.pleaseWaitDialogRef = null;
      //this.opened = false;
    }
  }
}
