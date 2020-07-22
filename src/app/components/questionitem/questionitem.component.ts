import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum/forum.service';
import { Answer } from '../../model/answer';
import { Upvote } from '../../model/upvote';


@Component({
  selector: 'app-questionitem',
  templateUrl: './questionitem.component.html',
  styleUrls: ['./questionitem.component.css']
})
export class QuestionitemComponent implements OnInit {

  counter = 0;
  id : string;
  category: string;

  constructor(private router: Router,private route:ActivatedRoute, private api:ForumService) { }

  forumData:any=[]
  data : Object = {title:'',description:'',user_by:'',upvotes:'',category:''};
  allQuestions:any=[]
  answers:any = []
  question:any="";

  dataChanged(newObj)
  {

  }

  voted(id)
  {
    console.log(id);
    let item = this.answers.find(option => option.id == id);
    item.vote += 1;
    console.log(item.vote);
    var ques = new Upvote();
    ques.upvote = item.vote;
    this.api.upvoteanswer(id,ques);

  }

  votequestion(id)
  {
    console.log("upvote questio called");
    let item = this.forumData.find(option => option.id == id);
    item.votes += 1;
    console.log(item.votes);
    var ques = new Upvote();
    ques.upvote = item.votes;
    this.api.upvotequestion(this.id,ques);
  }

  gotoquestion(id,category)
  {
    console.log(id,category);
   // this.getquestiondetails(id);
   // this.getanswers(id,category);
  }
  onSubmit(form)
  {
    console.log("insert answer submit function");
    var ques = new Answer();
    ques.description = form.form.value.question1;
    ques.user_by = 'vidip';
    ques.upvotes = 100;
    ques.question_id = this.id;
    //this.dataobject = { title: form.form.value.question , description:'question description',user_by:'123',upvotes:0,category:'newcat'}
  //  this.forumData.push({'question':form.form.value.question1,askedby:'Vidip',answer_count:'0',votes:'0',category:'',answers:[]});
    this.submitanswer(ques);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('URL Params', params);
      this.id = params.id;
      this.category = params.category;
      this.getquestiondetails(this.id);
      this.getanswers(this.id,this.category);
    });
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.category = this.route.snapshot.paramMap.get('category');
    console.log(this.category);
   // this.forumData = this.forumData.filter(option => option.id == id);
    
    //this.getsimilarquestions(category);
   
  }

  getsimilarquestions(category)
  {
    console.log("component similar questions");
    this.api.getsimilarquestions(category)
    .subscribe(data => {
      for (const d of (data as any)) {
        this.allQuestions.push({
          question: d.title,
          description: d.description,
          askedby: d.user_by,
          votes: d.upvotes,
          category: d.category
        });
      }
      console.log(this.allQuestions);
    });
  }
  
  getquestiondetails(id)
  {
    console.log('get particular question');
    this.api.getquestionbyid(id)
    .subscribe(data => {
      console.log(data);
      this.forumData = [];
      for (const d of (data as any)) {
        this.forumData.push({
          question: d.title,
          description: d.description,
          askedby: d.user_by,
          votes: d.upvotes,
          category: d.category
        });
      }
      console.log(this.forumData);
    });
  }

  getanswers(id,category)
  {
    console.log("get answers called");
    this.api.getanswersquestion(id)
    .subscribe(data => {
      this.answers = [];
      for (const d of (data as any)) {
        this.answers.push({
          id: d._id,
          answer: d.description,
          by: d.user_by,
          vote: d.upvotes
        });
      }
      console.log(this.answers);

    });

  /*  var ids = this.forumData[0].answers;
    this.answers = this.answers.filter(function(itm){
      return ids.indexOf(itm.id) > -1;
    });
    console.log(this.answers);*/

    console.log("component similar questions");
    this.api.getsimilarquestions(category)
    .subscribe(data => {
      for (const d of (data as any)) {
        this.allQuestions.push({
          question: d.title,
          description: d.description,
          askedby: d.user_by,
          votes: d.upvotes,
          category: d.category,
          question_id:d._id
        });
      }
      this.allQuestions = this.allQuestions.filter(option => option.question_id != id);
    });
    
  }

  submitanswer(ques)
  {
    console.log(ques);
    this.api.submitanswer(ques);
    this.answers.push({
      id: ques.answerId,
      answer: ques.description,
      by: ques.user_by,
      vote: ques.upvoyes
    })
  }
}
