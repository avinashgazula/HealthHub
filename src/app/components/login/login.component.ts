import { RegisterComponent } from './../register/register.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    hide = true;
    consumer = true;
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        })
    }

    getEmailError = () => {
        if (this.email.hasError('required')) {
            return 'Email is required';
        }
        return 'Not a valid email';
    };

    getPasswordError = () => {
        if (this.password.hasError('required')) {
            return 'Password is required';
        }
        return 'Password must be atleast 8 characters long and have at least one uppercase, lowercase character and a symbol'
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

    login = () => {
        if (this.loginForm.valid) {
            this.snackBar.open('Login Succesful', '', {
                duration: 3000,
            });
            this.dialog.closeAll();
        }
    };
}
