import { FormGroup } from '@angular/forms';

export function MatchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
        const control1 = formGroup.controls[password];
        const control2 = formGroup.controls[confirmPassword];

        if (control2.errors && !control2.errors.mustMatch) {
            return;
        }

        if (control1.value !== control2.value) {
            control2.setErrors({ match: true });
        } else {
            control2.setErrors(null);
        }
    }
}