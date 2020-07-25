// author: Harshit Trivedi

import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { ScheduleCareComponent } from '../schedule-care/schedule-care.component';

@Component({
  selector: 'healthhub-home-care',
  templateUrl: './home-care.component.html',
  styleUrls: ['./home-care.component.css']
})
export class HomeCareComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  onScheduleCare = () => {
    this.dialog.open(ScheduleCareComponent)
  }
}
