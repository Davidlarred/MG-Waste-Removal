import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { passwordConfirmationValidator } from '../../../../../assets/shared/validators/password-confirmation.validator';
import { passwordStrengthValidator } from '../../../../../assets/shared/validators/password-strength.validator';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../../Services/auth.service';
import { NotificationsService } from '../../../../../assets/shared/services/notification.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.2s ease', style({ opacity: 0 }))]),
    ]),
  ],
  providers: [AuthService],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  isDropdownOpen: number | null = null;
  form: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private notificatioService: NotificationsService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  @ViewChild('dropdownContainer1') dropdownContainer1?: ElementRef;
  @ViewChild('dropdownContainer2') dropdownContainer2?: ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!this.isInsideDropdown(event, 1) && !this.isInsideDropdown(event, 2)) {
      this.isDropdownOpen = null;
    }
  }

  toggleHide() {
    this.hide = !this.hide;
  }

  private isInsideDropdown(event: MouseEvent, dropdownId: number): boolean {
    const dropdownContainer =
      dropdownId === 1 ? this.dropdownContainer1 : this.dropdownContainer2;
    return dropdownContainer?.nativeElement.contains(event.target) ?? false;
  }

  toggleDropdown(dropdownId: number) {
    this.isDropdownOpen =
      this.isDropdownOpen === dropdownId ? null : dropdownId;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  login(): void {
    // Prepare login credentials
    const loginForm = {
      email: this.form.value.email.toLowerCase(),
      password: this.form.value.password,
    };

    this.authService.signIn(loginForm).subscribe({
      next: (response) => {
        if (response.token) {
          // Store the token securely
          localStorage.setItem('token', response.token); // Consider using a more secure storage method

          // Optional: navigate to a different page upon successful login
          this.router.navigate(['/']);

          // Display welcome notification
          this.notificatioService.showSwalWithoutButtons(
            'Welcome',
            'success',
            2000,
            'You can now access your account.'
          );
        }
      },
      error: (error) => {
        // Determine a user-friendly error message
        const errorMessage = this.getFriendlyErrorMessage(error);

        if (error.error.message === 'Activate account') {
          this.router.navigate(['AccountVerification/'], {
            state: { email: error.error.email },
          });
          this.notificatioService.showSwalWithoutButtons(
            'Oops, something went wrong.',
            'error',
            10000,
            errorMessage
          );
        } else {
          this.notificatioService.showSwalWithoutButtons(
            'Oops, something went wrong.',
            'error',
            10000,
            errorMessage
          );
        }
        // Log the error for debugging purposes
        // console.error('Login error:', error);

        // Re-enable the form for user correction
        this.form.enable();

        // Display an error notification
      },
    });
  }

  private getFriendlyErrorMessage(error: any): string {
    if (error.error.message === 'Activate account') {
      return 'You must activate your account before logging in. Please check your email for instructions.';
    } else {
      return 'An error occurred. Please call us at 786 782-1840.';
    }
  }
}
