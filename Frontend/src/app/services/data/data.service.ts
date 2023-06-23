import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userSource = new BehaviorSubject({
    email:'',
    id:''
  });
  public currentUser = this.userSource.asObservable();



  private userSearch = new BehaviorSubject({
    name:'',
  });
  public currentSearch = this.userSearch.asObservable();



  private userFound = new BehaviorSubject({
    id:'',
  });
  public currentFound = this.userFound.asObservable();



  private postSource = new BehaviorSubject({
    id:'',
  });
  public currentPost = this.postSource.asObservable();


  private quizSource = new BehaviorSubject({
    idQuiz:'',
    score:'',
  });
  public currentQuiz = this.quizSource.asObservable();


  constructor() { }

  public changeUserData(user: any): void {
    this.userSource.next(user);
}

public changeSearchData(user: any): void {
  this.userSearch.next(user);
}
public changeFoundData(user: any): void {
  this.userFound.next(user);
}
public changePostData(post: any): void {
  this.postSource.next(post);
}
public changeQuizData(quiz: any): void {
  this.quizSource.next(quiz);
}
}
