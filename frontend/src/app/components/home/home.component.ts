import { Component, OnInit } from '@angular/core';  

import { Post } from "src/app/models/Post";
import { User } from "src/app/models/User";


import { Observable } from "rxjs";

import { PostService } from "src/app/services/post.service";
import { AuthService } from "src/app/services/auth.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts$: Observable<Post[]>;
  userId: Pick<User, "id">;
  postRandom: Observable<Post[]>;
  quote: string;



  constructor(
    private postService: PostService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.fetchAll();
    this.userId = this.authService.userId;
    this.postRandom = this.getRandom();
  }

  fetchAll(): Observable<Post[]> {
    return this.postService.fetchAll();
  }

  getRandom(): Observable<Post[]> {
    return this.postService.getRandom();
  }

  getQuote() {
   
     this.postRandom.subscribe((resp:any) => {
      console.log(resp[0]) 
      document.getElementById('newQuoteSection').innerHTML = '"' + resp[0].body + '"' ;
      document.getElementById('newAuteurSection').innerHTML = resp[0].title;
    });
    
  }

}
