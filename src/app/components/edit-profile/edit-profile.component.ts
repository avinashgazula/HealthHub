import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchPasswords } from 'src/app/helpers/MatchPasswords';

@Component({
  selector: 'healthhub-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  hide = true;
  title = "Health Logger";
  submitted = false;

  editProfileForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.editProfileForm = this.formBuilder.group({
      firstName: ['FirstName', Validators.required],
      lastName: ['LastName', Validators.required],
      emailID: ['someone@dal.ca', [Validators.required, Validators.email]],
      password: ['Abcd@123', [Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
      confirmPassword: ['Abcd@123', [Validators.required]]
    }, {
      validator: MatchPasswords('password', 'confirmPassword')
    });
  }

  cancel() {
    this.router.navigate(['/'])
  }

  get f() { return this.editProfileForm.controls; }

  edit() {
    this.submitted = true;

    if (this.editProfileForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!!');
  }

  get emailID() {
    return this.editProfileForm.get('email');
  }

  get password() {
    return this.editProfileForm.get('password')
  }

  get confirmPassword() {
    return this.editProfileForm.get('confirmPassword')
  }
  getEmailIDError = () => {
    if (this.emailID.hasError('required')) {
      return 'Email is required';
    }
    return this.emailID.hasError('email') ? 'Not a valid email' : '';
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

}
