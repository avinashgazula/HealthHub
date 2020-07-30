/* @author Avinash Gazula <agazula@dal.ca> */
/* @author Sai Sunil Menta <ss734478@dal.ca> */

import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { LoginService } from './../../services/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    collapsed: Boolean = true;
    isLoggedIn: Boolean = false;
    notifications: any[];
    count: Number;

    constructor(
        private dialog: MatDialog,
        private loginService: LoginService,
        private snackBar: MatSnackBar, private notificationService: NotificationService) {
        dialog.afterAllClosed.subscribe(() => {
            this.ngOnInit();
        })
    }

    ngOnInit(): void {
        if (localStorage.getItem('token') !== null) {
            this.isLoggedIn = true;
        }
        console.log(this.isLoggedIn);

        this.notificationService.getNotifications().subscribe((data) => {
            this.notifications = data;
            this.count = data.length;
        });
    }

    openLoginPage = () => {
        this.dialog.open(LoginComponent);
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

    markAsRead(id) {
        console.log(id);
        this.notificationService.markAsRead(id).subscribe((data) => {
            console.log('Notofication marked as read ' + data);
        });

        this.notificationService.getNotifications().subscribe((data) => {
            this.notifications = data;
            this.count = data.length;
        });
    }

}
