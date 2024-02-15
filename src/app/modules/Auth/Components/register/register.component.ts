import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { passwordConfirmationValidator } from '../../../../../assets/shared/validators/password-confirmation.validator';
import { passwordStrengthValidator } from '../../../../../assets/shared/validators/password-strength.validator';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { singleNameValidator } from '../../../../../assets/shared/validators/name-spaces.validator';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.2s ease', style({ opacity: 0 }))]),
    ]),
  ],
  styleUrls: ['./register.component.scss'], // Corrected property name from 'styleUrl' to 'styleUrls' and made it an array
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private passwordSub: Subscription;

  checkboxItems = [
    { name: 'Lowercase character', value: 'lowercase', isChecked: false },
    { name: 'Uppercase character', value: 'upperCase', isChecked: false },
    { name: 'Eight characters', value: 'eightCharacters', isChecked: false },
    { name: 'One number', value: 'oneNumber', isChecked: false },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]*'),
            singleNameValidator(),
          ],
        ],
        lastname: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ ]*'),
            singleNameValidator(),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(8),
            passwordStrengthValidator(),
          ],
        ],
        passwordConfirmation: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(8),
            passwordStrengthValidator(),
          ],
        ],
      },
      { validators: passwordConfirmationValidator }
    );

    this.passwordSub = new Subscription();
  }

  ngOnInit(): void {
    this.onPasswordValueChanges();
  }

  ngOnDestroy(): void {
    this.passwordSub.unsubscribe();
  }

  onPasswordValueChanges(): void {
    // Unsubscribe from the existing subscription if onPasswordValueChanges is called again
    this.passwordSub.unsubscribe();

    // Start with a fresh Subscription instance
    this.passwordSub = new Subscription();

    // Check if the 'password' control exists
    if (this.form.get('password')) {
      // Add the new subscription to passwordSub
      this.passwordSub.add(
        this.form.controls['password'].valueChanges.subscribe(
          (password: string) => {
            const conditions = [
              {
                regex: /[a-z]/,
                value: 'Lowercase character',
                isChecked: /[a-z]/.test(password),
              },
              {
                regex: /[A-Z]/,
                value: 'Uppercase character',
                isChecked: /[A-Z]/.test(password),
              },
              {
                regex: /.{8,}/,
                value: 'Eight characters',
                isChecked: password.length >= 8,
              },
              {
                regex: /[0-9]/,
                value: 'One number',
                isChecked: /[0-9]/.test(password),
              },
            ];

            // Update checkboxItems based on the conditions
            this.checkboxItems = conditions.map(
              ({ regex, value, isChecked }) => ({
                name: value, // Assuming 'value' is meant to be a descriptive string for the checkbox
                value: regex.toString(), // Store the regex pattern as string if needed for display
                isChecked,
              })
            );
          }
        )
      );
    }
  }

  toggleCheckboxState(index: number): void {
    // This function might not be necessary if checkboxes are only for display purposes
    this.checkboxItems[index].isChecked = !this.checkboxItems[index].isChecked;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  submitForm(): void {
    console.log(this.form.value);
  }
}
