/* @author Sai Sunil Menta <ss734478@dal.ca> */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Writeblog } from '../../model/writeblog.model';
import { WriteblogService } from '../../services/writeblog/writeblog.service';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from './../../../environments/environment';


declare var M: any;
@Component({
  selector: 'healthhub-blogshome',
  templateUrl: './blogshome.component.html',
  styleUrls: ['./blogshome.component.css'],
  providers:[WriteblogService]
})


export class BlogshomeComponent implements OnInit {

  constructor(public writeblogService: WriteblogService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
    this.refreshWriteblogList();
  
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.writeblogService.selectedWriteblog = {
      _id: "",
      name: "",
      title: "",
      introduction: "",
      content: ""

    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.writeblogService.postWriteblog(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshWriteblogList();
        M.toast({ html: 'Your feedback has been saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.writeblogService.putWriteblog(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshWriteblogList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshWriteblogList() {
    this.writeblogService.getWriteblogList().subscribe((res) => {
      this.writeblogService.Writeblog = res as Writeblog[];
    });
  }

  onEdit(emp: Writeblog) {
    this.writeblogService.selectedWriteblog = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.writeblogService.deleteWriteblog(_id).subscribe((res) => {
        this.refreshWriteblogList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

  name:string
  title:string;
  content:string;
  introduction:string;
  id:string;
  click = (blog) => {
    this.name = blog.name;
    this.title = blog.title;
    this.content = blog.content;
    
    this.introduction = blog.introduction;

    this.id = blog._id;
    this.router.navigateByUrl('/blogcontent', { state: { blogObject: blog } });
};

}

