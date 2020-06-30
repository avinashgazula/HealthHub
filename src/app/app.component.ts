import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as M from "../assets/materialize/js/materialize.min.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'healthhub';
  constructor(public router: Router) {

  }
}
