import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Feedback } from '../../model/feedback.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class FeedbackService {
  selectedFeedback: Feedback;
  feedback: Feedback[];
  readonly baseURL = environment.serverUrl + '/feedback';

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