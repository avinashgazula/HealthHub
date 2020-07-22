import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../../model/question';
import { Answer } from '../../model/answer';
import { Upvote } from '../../model/upvote';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }
  
  getQuestions() {
    return this.http.get('http://localhost:8080/questions/');
  }

  getsimilarquestions(category)
  {
    console.log("into similar questions"+category);
    return this.http.get('http://localhost:8080/questions/category/'+category);
  }

  submitquestion(dataobject:Question)
  {
    console.log("in submit question",dataobject);
    return this.http.post('http://localhost:8080/questions/', dataobject).toPromise().then(data => {
      console.log(data);
    });
  }

  getquestionbyid(id)
  {
    return this.http.get('http://localhost:8080/questions/'+id);
  }

  getanswersquestion(id)
  {
    return this.http.get('http://localhost:8080/answers/'+id);
  }

  submitanswer(dataobject:Answer)
  {
    console.log("in submit answer",dataobject);
    return this.http.post('http://localhost:8080/answers/', dataobject).toPromise().then(data => {
      console.log(data);
    });
  }

  upvotequestion(id,dataobject:Upvote)
  {
    console.log("into upvote frontend");
    console.log(dataobject);
    return this.http.post('http://localhost:8080/questions/upvote/'+id, dataobject).toPromise().then(data => {
      console.log(data);
    });
  }

  upvoteanswer(id,dataobject:Upvote)
  {
    console.log("into upvote answer");
    console.log(dataobject);
    return this.http.post('http://localhost:8080/answers/upvote/'+id, dataobject).toPromise().then(data => {
      console.log(data);
    });
  }

}
