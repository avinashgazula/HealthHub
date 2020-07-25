import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'healthhub-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
    ) {
      this.router.getCurrentNavigation().extras.state;
   }

  keyword;
  filter;
  body;
  result;

  ngOnInit(): void {
    this.keyword = history.state.keyword;
    this.filter = history.state.filter;
    
    if(this.keyword == null){
      this.router.navigate(['/consult']);
    }
    else {
      this.body = {keyword: this.keyword, searchfield: this.filter};
      this.http.post<any>('http://localhost:8080/search/search-doctors', this.body).subscribe(results => {
          this.result = results;
        })
      }  
  }
  
  onClick(doctor){
    
  }

}
