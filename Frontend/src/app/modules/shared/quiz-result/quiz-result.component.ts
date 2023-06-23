import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent {
  public subscription: Subscription | undefined;
  public currQuiz: any;

  quizId: any;
  idUser: any;
  score: any;
  passed: any;


  constructor(
    private router:Router,
    private coursesService: CoursesService,
    private dataService: DataService,


    ){}

  ngOnInit(): void {
   

    this.subscription = this.dataService.currentQuiz.subscribe(quiz => this.currQuiz = quiz);

    this.quizId = this.currQuiz['idQuiz'];
    this.score = this.currQuiz['score'];
    this.idUser = Number(localStorage.getItem('Id'));

    if (this.score >= 50){
          this.passed = "Congratulations, you passed the quiz !";
    }
    else{
      this.passed = "Oh, you didn't pass the quiz !";
    }

    this.postQuizResult();
    
    
  }



  public postQuizResult(): void{
    this.coursesService.getQuizResult(this.quizId,this.idUser).subscribe(
      (result) => {
        console.log(result);
        if(result)// daca deja exista test ii fac update
        {          
          this.coursesService.updateQuizResult(this.quizId,this.idUser,this.score).subscribe(
            (result) => {
              console.log(result);
      
            },
            (error) => {
              console.log(error);
            }
        
           );
        }
        else{//altfel il adaug
          const result = {
            "quizId": this.quizId,
            "userId": this.idUser,
            "score": this.score
          };
         
      
          this.coursesService.putQuizResult(result).subscribe(
            (result) => {
              console.log(result);
            },
            (error) =>{
              console.error(error);
            }
          );

        }
      },
      (error) =>{
        console.error(error);
      }
    );
      
  
  }

  public done(): void{
    this.router.navigate(['/profile']);
  }



}
