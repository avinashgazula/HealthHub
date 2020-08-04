/* @author Sai Sunil Menta <ss734478@dal.ca> */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Writeblog } from '../../model/writeblog.model';
import { WriteblogService } from '../../services/writeblog/writeblog.service';


declare var M: any;
@Component({
  selector: 'healthhub-blogcontent',
  templateUrl: './blogcontent.component.html',
  styleUrls: ['./blogcontent.component.css'],
  providers:[WriteblogService]
})


export class BlogcontentComponent implements OnInit {

  constructor(public writeblogService: WriteblogService) { }

  ngOnInit() {
    this.blog = history.state.blogObject;
    this.resetForm();
    this.refreshWriteblogList();
  }
blog:any;
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

}

