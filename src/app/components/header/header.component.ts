import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed: Boolean = true;
  isLoggedIn: Boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.isLoggedIn = true
    }
  }

  openLoginPage = () => {
    this.dialog.open(LoginComponent)
  }

  logout = () => {
    console.log(`logged out`);

  }

}
