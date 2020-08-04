import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate } from '@angular/router';
import { LoginComponent } from './../components/login/login.component';
import { AuthService } from './../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  status: boolean = false;

  constructor(private authService: AuthService, private dialog: MatDialog, @Inject(PLATFORM_ID) private platformId) {
  }

  canActivate(): Promise<boolean> {

    return new Promise((resolve, reject) => {
      if (isPlatformBrowser(this.platformId)) {
        this.authService.verifyToken().subscribe(data => {
          if (data.success) {
            resolve(true)
          } else {
            this.dialog.open(LoginComponent, { disableClose: true })
            resolve(false)
          }
        })
      } else {
        resolve(false)
      }

    })

  }

}
