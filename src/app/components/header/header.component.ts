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

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLoginPage = () => {
    this.dialog.open(LoginComponent);
  }

  openNotificationPage = () => {
    this.dialog.open(Notification);
  }

  iconClicked(menuIcon: HTMLElement) {
    this.collapsed = !this.collapsed;
    if (this.collapsed) {
      menuIcon.classList.add('collapse');
    } else {
      menuIcon.classList.remove('collapse');
    }

  }

}
