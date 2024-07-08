import { FormGroup, ValidationErrors } from '@angular/forms';

export function passwordConfirmationValidator(
  control: FormGroup,
): ValidationErrors | null {
  const password = control.get('password').value;
  const passwordConfirmation = control.get('passwordConfirmation').value;
  return password !== passwordConfirmation
    ? { invalidPasswordConfirmation: true }
    : null;
}
