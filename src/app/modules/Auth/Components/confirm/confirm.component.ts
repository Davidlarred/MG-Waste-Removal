import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../../../../assets/shared/services/notification.service';
import { AuthService } from '../../Services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule],
  providers: [AuthService],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit, OnDestroy {
  email: string = '' || 'Email registered with account';
  sessionActive: boolean;
  user$: Observable<User | null>;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getCurrentUser();

    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.sessionActive = user !== null;
      if (user) {
        this.email = user.email;
      }
    });
  }

  // private confirmUser(token: string): void {
  //   if (token) {
  //     this.authService.confirmRegistration(token).subscribe({
  //       next: (response) => {
  //         if (response.code === 303) {
  //           this.router.navigate(['Login']);
  //           this.notificationService.showSwalWithoutButtons(
  //             'Your account has been successfully verified',
  //             'success',
  //             3000,
  //             'Please log in now'
  //           );
  //         } else if (response.code === 304) {
  //           this.router.navigate(['Login']);
  //           this.notificationService.showSwalWithButtons(
  //             'Your account has already been verified.',
  //             'success',
  //             'Please log in now'
  //           );
  //         }
  //       },
  //       error: (error) => {
  //         if (error.error.code === 302) {
  //           this.router.navigate(['Login']);
  //           this.notificationService.showSwalWithButtons(
  //             'Seems your link has expired',
  //             'warning',
  //             'Please check your email for the new confirmation link',
  //           );
  //         } else if (error.error.code === 301) {
  //           this.router.navigate(['Login']);
  //           this.notificationService.showSwalWithButtons(
  //             'It seems an email has already been sent to you. Please check your email.',
  //             'error',
  //             'If you did not receive an email, please contact support.',
  //           );
  //         } else if (error.error.code === 305) {
  //           this.router.navigate(['Register']);
  //           this.notificationService.showSwalWithButtons(
  //             'We were unable to find your account.',
  //             'error',
  //             ' Please register again. If the problem persists, contact support.',
  //           );
  //         } else {
  //           this.router.navigate(['/']);
  //           this.notificationService.showSwalWithoutButtons(
  //             'Oops, something went wrong.',
  //             'error',
  //             5000,
  //             'Please try again. If the problem persists, contact support.'
  //           );
  //         }
  //       },
  //     });
  //   }
  // }
  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
