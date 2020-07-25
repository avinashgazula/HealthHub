

import { FeedbackService } from '../shared/feedback.service';
import { Feedback } from '../shared/feedback.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';





declare var M: any;
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [FeedbackService]
  

})
export class FeedbackComponent implements OnInit {
 
  constructor(public feedbackService: FeedbackService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshFeedbackList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.feedbackService.selectedFeedback = {
      _id: "",
      name: "",
      date: "",
      feedback: ""
     
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.feedbackService.postFeedback(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshFeedbackList();
        M.toast({ html: 'Your feedback has been saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.feedbackService.putFeedback(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshFeedbackList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshFeedbackList() {
    this.feedbackService.getFeedbackList().subscribe((res) => {
      this.feedbackService.feedback = res as Feedback[];
    });
  }

  onEdit(emp: Feedback) {
    this.feedbackService.selectedFeedback = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.feedbackService.deleteFeedback(_id).subscribe((res) => {
        this.refreshFeedbackList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}