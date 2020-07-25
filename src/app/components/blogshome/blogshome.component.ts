/* @author Sai Sunil Menta <ss734478@dal.ca> */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'healthhub-blogshome',
  templateUrl: './blogshome.component.html',
  styleUrls: ['./blogshome.component.css']
})
export class BlogshomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewBlog() {

    this.router.navigate(['/single-blog']);
  }

}
