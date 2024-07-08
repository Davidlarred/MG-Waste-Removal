import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ShowSnackComponent } from '../components/show-snack/show-snack.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private modalHasBeenClosed = new Subject<boolean>();

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) {}

  getListenerStatus() {
    return this.modalHasBeenClosed.asObservable();
  }

  show(component, text: string, time: number) {
    return this.dialog
      .open(component, {
        data: { text: text, time: time },
        backdropClass: 'backdropClass',
        panelClass: 'rounded',
      })
      .afterClosed()
      .subscribe(() => {});
  }

  showOnModal(component, data, position?) {
    if (position) {
      return this.dialog
        .open(component, {
          backdropClass: 'backdropClass',
          data: data,
          position: {
            top: `${position}`,
          },
        })
        .afterClosed()
        .subscribe(() => {
          this.modalHasBeenClosed.next(true);
        });
    }
    return this.dialog
      .open(component, {
        backdropClass: 'backdropClass',
        data: data,
      })
      .afterClosed()
      .subscribe(() => {
        this.modalHasBeenClosed.next(true);
      });
  }

  showOnModalWithSuscription(component, data, position?) {
    if (position) {
      return this.dialog
        .open(component, {
          backdropClass: 'backdropClass',
          data: data,
          position: {
            top: `${position}`,
          },
        })
        .afterClosed();
    }
    return this.dialog
      .open(component, {
        backdropClass: 'backdropClass',
        data: data,
      })
      .afterClosed();
  }

  // showAreYouSure() {
  //   return this.bottomSheet.open(AreYouSureComponent);
  // }

  showSnackBar(text, duration, cssClass) {
    setTimeout(() => {
      this._snackBar.openFromComponent(ShowSnackComponent, {
        duration: duration,
        data: text,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: [`${cssClass}`],
      });
    }, 100);
  }

  showSwalWithoutButtons(
    title: string,
    type: string,
    time: number,
    subttitle?: string
  ) {
    Swal.fire({
      title: title,
      text: subttitle,
      icon: type,
      showConfirmButton: false,
      timer: time,
    });
  }

  showSwalWithButtons(title: string, type: string, subttitle?: string) {
    const buttonClassMap = {
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
    };

    // Use the type to determine the correct button class, defaulting to 'btn-default' if type is not mapped
    const confirmButtonClass = buttonClassMap[type] || 'btn-default';

    Swal.fire({
      title: title,
      text: subttitle,
      icon: type,
      confirmButtonText: 'Ok',
      customClass: {
        confirmButton: confirmButtonClass,
      },
      buttonsStyling: false,
    });
  }

  closeAll() {
    this.dialog.closeAll();
  }
}
