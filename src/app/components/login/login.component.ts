/* @author Avinash Gazula <agazula@dal.ca> */

import { RegisterComponent } from './../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './../../services/login/login.service';
import { ResetPasswordComponent } from './../reset-password/reset-password.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    hide = true;
    consumer = true;
    loginForm: FormGroup;
    emailError: String = '';
    passwordError: String = '';


    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private loginService: LoginService) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    getEmailError = () => {
        if (this.email.hasError('required')) {
            return 'Email is required';
        } else if (this.email.hasError('email')) {
            return 'Not a valid email';
        }
        return this.emailError

    };

    getPasswordError = () => {
        if (this.password.hasError('required')) {
            return 'Password is required';
        }
        return this.passwordError
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password')
    }

    selectConsumer = () => {
        this.consumer = true;
    };

    selectDoctor = () => {
        this.consumer = false;
    };

    openRegisterPage = () => {
        this.dialog.closeAll();
        this.dialog.open(RegisterComponent);
    };

    openResetPasswordPage = () => {
        this.dialog.closeAll();
        this.dialog.open(ResetPasswordComponent)
    }

    login = () => {
        if (this.loginForm.valid) {
            let formData = this.loginForm.value;
            formData.type = this.consumer ? "consumer" : "doctor";

            this.loginService.login(JSON.stringify(formData)).subscribe(
                data => {
                    if (data.success) {
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("userType", data.user.type);
                        localStorage.setItem("userId", data.user._id);
                        localStorage.setItem("name", data.user.name);
                        this.dialog.closeAll();
                        this.snackBar.open('Login Succesful', '', {
                            duration: 3000,
                        });

                    } else {
                        this.loginForm.markAsUntouched();
                        if (data.message.includes('Email')) {
                            this.emailError = data.message;
                            this.loginForm.controls['email'].setErrors({ 'other': data.message })
                        } else {
                            this.passwordError = data.message;
                            this.loginForm.controls['password'].setErrors({ 'other': data.message })
                        }
                    }

                }
            )

        }
    };
}
