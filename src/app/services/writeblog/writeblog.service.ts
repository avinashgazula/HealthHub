

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Writeblog } from '../../model/writeblog.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class WriteblogService {
  selectedWriteblog: Writeblog;
  Writeblog: Writeblog[];
  readonly baseURL = environment.serverUrl + '/writeblog';

  constructor(private http: HttpClient) { }

  postWriteblog(emp: Writeblog) {
    return this.http.post(this.baseURL, emp);
  }

  getWriteblogList() {
    return this.http.get(this.baseURL);
  }

  putWriteblog(emp: Writeblog) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteWriteblog(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}