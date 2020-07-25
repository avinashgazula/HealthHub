import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from './../login/login.component';
import { MatchPasswords } from 'src/app/helpers/MatchPasswords';
import { RegistrationService } from '../../services/registration/registration.service';
import { DoctorDetailsComponent } from './../doctor-details/doctor-details.component';

import { environment } from '../../../environments/environment'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    hide = true;
    consumer = true;
    registerForm: FormGroup;
    registrationErrorMessage: String = '';

    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private registrationService: RegistrationService) { }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern(environment.passwordRegex)]],
            confirmPassword: ['', [Validators.required]]
        }, {
            validator: MatchPasswords('password', 'confirmPassword')
        })
    }


    getEmailError = () => {
        if (this.email.hasError('required')) {
            return 'Email is required';
        }
        return this.email.hasError('email') ? 'Not a valid email' : this.registrationErrorMessage;
    };

    getPasswordError = () => {
        if (this.password.hasError('required')) {
            return 'Password is required';
        }
        return 'Password must be atleast 8 characters long and have at least one uppercase character'
    }

    getConfirmPasswordError = () => {
        if (this.confirmPassword.hasError('required')) {
            return 'Password is required';
        }
        return 'Passwords do not match'
    }

    get name() {
        return this.registerForm.get('name')
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password')
    }

    get confirmPassword() {
        return this.registerForm.get('confirmPassword')
    }

    selectConsumer = () => {
        this.consumer = true;
    };

    selectDoctor = () => {
        this.consumer = false;
    };

    register = () => {
        if (this.registerForm.valid) {
            var formData = this.registerForm.value;
            formData.type = this.consumer ? "consumer" : "doctor";
            delete formData.confirmPassword;

            this.registrationService.register(JSON.stringify(formData)).subscribe(
                data => {
                    console.log(data);
                    if (data.success) {
                        if (!this.consumer) {
                            this.dialog.closeAll();
                            this.dialog.open(DoctorDetailsComponent, {
                                data: {
                                    "email": formData.email,
                                    "type": formData.type
                                }
                            });
                        }
                        else {
                            this.openLoginPage();
                            this.snackBar.open('Registration Succesful', '', {
                                duration: 3000,
                            });
                        }
                    } else {
                        console.log(data.error);
                        this.registerForm.markAsUntouched();
                        this.registerForm.controls['email'].setErrors({ 'other': data.error })
                        this.registrationErrorMessage = data.error;
                    }
                }
            )

        }

    };

    openLoginPage = () => {
        this.dialog.closeAll();
        this.dialog.open(LoginComponent);
    };

}
