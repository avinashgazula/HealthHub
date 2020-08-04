/* @author Avinash Gazula <agazula@dal.ca> */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterComponent } from '../register/register.component';
import { environment } from './../../../environments/environment';
import { ResetPasswordService } from './../../services/reset-password/reset-password.service';
import { LoginComponent } from './../login/login.component';



@Component({
  selector: 'healthhub-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  consumer = true;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  emailError: String = '';
  passwordError: String = '';
  currentEmail: String = '';
  emailErrorMessage: String = '';
  tokenErrorMessage: String = '';
  disable = true;


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private resetPasswordService: ResetPasswordService) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.passwordForm = this.fb.group({
      token: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(environment.passwordRegex)]],
    });
    this.token.disable();
    this.password.disable();
  }

  getEmailError = () => {
    if (this.email.hasError('required')) {
      return 'Email is required';
    } else if (this.email.hasError('email')) {
      return 'Not a valid email';
    }
    return this.emailErrorMessage;
  };

  getTokenError = () => {
    if (this.token.hasError('required')) {
      return 'Token is required';
    }
    return this.tokenErrorMessage;
  };

  getPasswordError = () => {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }
    return 'Password must be atleast 8 characters long and have at least one uppercase character'
  }

  get email() {
    return this.emailForm.get('email');
  }

  get password() {
    return this.passwordForm.get('password');
  }

  get token() {
    return this.passwordForm.get('token');
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

  openLoginPage = () => {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent)
  }

  sendAuthenticationCode = () => {
    if (this.emailForm.valid) {
      let formData = this.emailForm.value;
      formData.type = this.consumer ? "consumer" : "doctor";

      this.resetPasswordService.sendVerificationToken(JSON.stringify(formData)).subscribe(
        data => {
          if (data.success) {
            this.token.enable();
            this.password.enable();
            this.disable = false;
            this.currentEmail = this.email.value;
            this.snackBar.open('Verification token sent to ' + this.currentEmail, '', {
              duration: 3000,
            });
          } else {
            this.emailForm.controls['email'].setErrors({ other: data.message });
            this.emailErrorMessage = data.message;
          }
        }
      )
    }
  }

  resetPassword = () => {
    if (this.passwordForm.valid) {
      let formData = this.passwordForm.value;
      formData.type = this.consumer ? "consumer" : "doctor";
      formData.email = this.currentEmail;
      formData.newPassword = formData.password;
      delete formData.password;

      this.resetPasswordService.updatePassword(formData).subscribe(
        data => {
          if (data.success) {
            this.openLoginPage();
            this.snackBar.open('Password reset succesfully', '', {
              duration: 500,
            });
          } else {
            this.passwordForm.controls['token'].setErrors({ other: data.message });
            this.tokenErrorMessage = data.message;
          }
        }
      );
    }
  }

}
