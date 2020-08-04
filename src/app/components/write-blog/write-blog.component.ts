import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Writeblog } from '../../model/writeblog.model';
import { WriteblogService } from '../../services/writeblog/writeblog.service';
declare var M: any;
@Component({
  selector: 'healthhub-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css']
})
export class WriteBlogComponent implements OnInit {

  constructor(public writeblogService: WriteblogService) { }

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

}


