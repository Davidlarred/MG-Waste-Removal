import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function singleNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚ]*$/.test(value);
    return isValid ? null : { 'singleName': true };
  };
}