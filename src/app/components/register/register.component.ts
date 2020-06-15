import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from './../login/login.component';
import { MatchPasswords } from 'src/app/helpers/MatchPasswords';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

    hide = true;
    consumer = true;
    registerForm: FormGroup;

    constructor(private fb: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
            confirmPassword: ['', [Validators.required]]
        }, {
            validator: MatchPasswords('password', 'confirmPassword')
        })
    }


    getEmailError = () => {
        if (this.email.hasError('required')) {
            return 'Email is required';
        }
        return this.email.hasError('email') ? 'Not a valid email' : '';
    };

    getPasswordError = () => {
        if (this.password.hasError('required')) {
            return 'Password is required';
        }
        return 'Password must be atleast 8 characters long and have at least one uppercase, lowercase character and a symbol'
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
            this.snackBar.open('Registration Succesful', '', {
                duration: 3000,
            });
            this.dialog.closeAll();
        }

    };

    openLoginPage = () => {
        this.dialog.closeAll();
        this.dialog.open(LoginComponent);
    };
}
