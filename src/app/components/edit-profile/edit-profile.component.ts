/* @author Avinash Gazula <agazula@dal.ca> */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { EditProfileService } from './../../services/edit-profile/edit-profile.service';

@Component({
  selector: 'healthhub-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  hide = true;
  editProfileForm: FormGroup;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private editProfileService: EditProfileService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.editProfileForm = this.formBuilder.group({
      name: [localStorage.getItem("name")],
      email: [localStorage.getItem("email"), [Validators.email]],
      password: [null, [Validators.pattern(environment.passwordRegex)]]
    });
  }

  cancel() {
    this.router.navigate(['/'])
  }

  edit() {
    if (this.editProfileForm.valid) {
      var formData = {
        name: this.name.value,
        type: localStorage.getItem('userType'),
        currentEmail: localStorage.getItem('email'),
        newEmail: this.email.value,
        password: this.password.value,
      };
      console.log(formData);

      this.editProfileService.editProfile(formData).subscribe(
        data => {
          console.log(data);

          if (data.success) {
            localStorage.setItem("name", data.user.name)
            localStorage.setItem("email", data.user.email)
            this.dialog.closeAll();
            this.snackBar.open('Profile Updated!', '', {
              duration: 3000,
            });
          }
        }
      )
    } else {
      console.log(`form invalid`);

    }

  }

  get name() {
    return this.editProfileForm.get('name');
  }

  get email() {
    return this.editProfileForm.get('email');
  }

  get password() {
    return this.editProfileForm.get('password')
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


}
