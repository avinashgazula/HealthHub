/* @author Vidip Malhotra <vidip.malhotra@dal.ca> */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  id: string;
  category: string;

  constructor(private router: Router, private route: ActivatedRoute, private api: ForumService) { }

  forumData: any = [{
    question: '',
    description: '',
    askedby: '',
    votes: '',
    category: ''
  }]
  data: Object = { title: '', description: '', user_by: '', upvotes: '', category: '' };
  allQuestions: any = []
  answers: any = []
  question: any = "";
  alert_message: string;
  vote_alert: string;
  vote_alert_message: string;

  voted(id) {
    let item = this.answers.find(option => option.id == id);
    if (item.user_id != localStorage.getItem('userId') && localStorage.getItem('userId')) {
      item.vote += 1;
      var ques = new Upvote();
      ques.upvote = item.vote;
      this.api.upvoteanswer(id, ques);
    }
    else {
      this.vote_alert = 'You can not upvote your own Question/Answer';
      setTimeout(() => {
        this.vote_alert = '';
      }, 2000);
    }
  }

  votequestion(id) {
    let item = this.forumData.find(option => option.id == id);
    if (item.user_id != localStorage.getItem('userId') && localStorage.getItem('userId')) {
      item.votes += 1;
      var ques = new Upvote();
      ques.upvote = item.votes;
      this.api.upvotequestion(this.id, ques);
    }
    else {
      this.vote_alert_message = 'You can not upvote your own Question/Answer';
      setTimeout(() => {
        this.vote_alert_message = '';
      }, 2000);
    }
  }

  onSubmit(form) {
    if (localStorage.getItem('name') && localStorage.getItem('userId')) {
      this.alert_message = '';
      var ques = new Answer();
      ques.description = form.form.value.question1;
      ques.user_by = localStorage.getItem('name')
      ques.upvotes = 0;
      ques.question_id = this.id;
      ques.user_id = localStorage.getItem('userId');
      this.submitanswer(ques);
    }
    else {
      this.alert_message = 'User is not logged in. Please LogIn To Continue';
      setTimeout(() => {
        this.alert_message = '';
      }, 2000);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.category = params.category;
      this.getquestiondetails(this.id);
      this.getanswers(this.id, this.category);
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.category = this.route.snapshot.paramMap.get('category');
  }

  getsimilarquestions(category) {
    this.allQuestions = [];
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
      });
  }

  getquestiondetails(id) {
    this.api.getquestionbyid(id)
      .subscribe(data => {
        this.forumData = [];
        for (const d of (data as any)) {
          this.forumData.push({
            question: d.title,
            description: d.description,
            askedby: d.user_by,
            votes: d.upvotes,
            category: d.category,
            user_id: d.user_id
          });
        }
      });
  }

  getanswers(id, category) {
    this.api.getanswersquestion(id)
      .subscribe(data => {
        this.answers = [];
        for (const d of (data as any)) {
          this.answers.push({
            id: d._id,
            answer: d.description,
            by: d.user_by,
            vote: d.upvotes,
            user_id: d.user_id
          });
        }

      });

    this.api.getsimilarquestions(category)
      .subscribe(data => {
        this.allQuestions = [];
        for (const d of (data as any)) {
          this.allQuestions.push({
            question: d.title,
            description: d.description,
            askedby: d.user_by,
            votes: d.upvotes,
            category: d.category,
            question_id: d._id
          });
        }
        this.allQuestions = this.allQuestions.filter(option => option.question_id != id);
      });

  }

  async submitanswer(ques) {
    await this.api.submitanswer(ques);
    this.getanswers(this.id, this.category);
  }
}
