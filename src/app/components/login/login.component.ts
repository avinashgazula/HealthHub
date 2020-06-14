import { RegisterComponent } from './../register/register.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    hide = true;
    consumer = true;

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

    ngOnInit(): void {}

    getEmailErrorMessage = () => {
        if (this.email.hasError('required')) {
            return 'You must enter a value';
        }
        return this.email.hasError('email') ? 'Not a valid email' : '';
    };

    getPasswordErrorMessage = () => {
        if (this.email.hasError('required')) {
            return 'You must enter a value';
        }
    };

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

    login = () => {
        this.snackBar.open('Login Succesful', '', {
            duration: 3000,
        });
        this.dialog.closeAll();
    };
}
