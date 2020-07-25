import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Feedback } from './feedback.model';  

@Injectable()
export class FeedbackService {
  selectedFeedback: Feedback;
  feedback: Feedback[];
  readonly baseURL = 'http://localhost:8080/feedback';

  constructor(private http: HttpClient) { }

  postFeedback(emp: Feedback) {
    return this.http.post(this.baseURL, emp);
  }

  getFeedbackList() {
    return this.http.get(this.baseURL);
  }

  putFeedback(emp: Feedback) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteFeedback(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}