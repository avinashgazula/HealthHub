import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from './../login/login.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    hide = true;
    consumer = true;
    passwordError: string;
    passwordErrorBool: Boolean;

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit(): void { }

    getErrorMessage = () => {
        if (this.email.hasError('required')) {
            return 'Enter email';
        }

        return this.email.hasError('email') ? 'Not a valid email' : '';
    };

    getPasswordErrorMessage = () => {
        if (this.password.hasError('required')) {
            return 'You must enter a value';
        }

        return this.password.hasError('pattern') ? 'Password must contain atleast one uppercase, lowercase, number and a symbol' : '';
    };

    onClick = () => {
        console.log('test');
    };

    selectConsumer = () => {
        this.consumer = true;
    };

    selectDoctor = () => {
        this.consumer = false;
    };

    register = () => {
        this.snackBar.open('Registration Succesful', '', {
            duration: 3000,
        });
        this.dialog.closeAll();
    };

    openLoginPage = () => {
        this.dialog.closeAll();
        this.dialog.open(LoginComponent);
    };
}
