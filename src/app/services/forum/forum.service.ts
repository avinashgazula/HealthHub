import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../../model/question';
import { Answer } from '../../model/answer';
import { Upvote } from '../../model/upvote';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  serverUrl: string = environment.serverUrl;
  constructor(private http: HttpClient) { }
  
  getQuestions() {
    return this.http.get(this.serverUrl +'/questions/');
  }

  getsimilarquestions(category)
  {
    console.log("into similar questions"+category);
    return this.http.get(this.serverUrl +'/questions/category/'+category);
  }

  submitquestion(dataobject:Question)
  {
    console.log("in submit question",dataobject);
    return this.http.post(this.serverUrl +'/questions/', dataobject).toPromise().then(data => {
      console.log(data);
    });
  }

  getquestionbyid(id)
  {
    return this.http.get(this.serverUrl +'/questions/'+id);
  }

  getanswersquestion(id)
  {
    return this.http.get(this.serverUrl +'/answers/'+id);
  }

  submitanswer(dataobject:Answer)
  {
    console.log("in submit answer",dataobject);
    return this.http.post(this.serverUrl +'/answers/', dataobject).toPromise().then(data => {
      console.log(data);
    });
  }

  upvotequestion(id,dataobject:Upvote)
  {
    console.log("into upvote frontend");
    console.log(dataobject);
    return this.http.post(this.serverUrl +'/questions/upvote/'+id, dataobject).toPromise().then(data => {
      console.log(data);
    });
  }

  upvoteanswer(id,dataobject:Upvote)
  {
    console.log("into upvote answer");
    console.log(dataobject);
    return this.http.post(this.serverUrl +'/answers/upvote/'+id, dataobject).toPromise().then(data => {
      console.log(data);
    });
  }

}
