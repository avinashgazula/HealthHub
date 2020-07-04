import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { LoginService } from './../../services/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed: Boolean = true;
  isLoggedIn: Boolean = false;

  constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private snackBar: MatSnackBar) {
    dialog.afterAllClosed.subscribe(() => {
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.isLoggedIn = true
    }
    console.log(this.isLoggedIn);

  }

  openLoginPage = () => {
    this.dialog.open(LoginComponent)
  }

  logout = () => {
    const token = localStorage.getItem('token');
    this.loginService.logout(token).subscribe(
      data => {
        if (data.success) {
          localStorage.clear();
          this.isLoggedIn = false;
          this.snackBar.open('Succesfully logged out', '', {
            duration: 3000,
          });
        } else {
          console.log(`logout failed`);

        }
      }
    )

  }

}
