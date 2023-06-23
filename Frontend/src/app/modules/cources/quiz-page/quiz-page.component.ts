import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { StudentsService } from 'src/app/services/students.service';
import { QuizResultComponent } from '../../shared/quiz-result/quiz-result.component';
import { DataService } from 'src/app/services/data/data.service';


interface Question {

    idQuestion: any,
    questionText: any,
    Answer1: any,
    Answer2: any,
    Answer3:any,
    selectedOption:any,
    correctAnswer: any
};

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent {

  questions: Question[] = [];
  selectedOption: any;
  idChapter:any;
  idQuiz:any;

  constructor(
    private router:Router,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    public dialog: MatDialog,
    private dataService: DataService,
    ){}

  ngOnInit(): void {
    this.idChapter = localStorage.getItem('ChapterToLoad');
    this.coursesService.getQuiz(this.idChapter).subscribe(
      (result) => {    
        this.idQuiz = result['idQuiz']; 
       
          //create a new list of questions with random answres
          for (const question of result['questions']) {

            var results = this.shuffle([
              question['wrongAnswer1'],
              question['wrongAnswer2'],
              question['correntAnswer'],
            ]);

            var newQuestion = {
              idQuestion: question['idQuestion'],
              questionText: question['questionText'],
              Answer1: results[0],
              Answer2: results[1],
              Answer3:results[2],
              correctAnswer:question['correntAnswer'],
              selectedOption:0
            };
            this.questions.push(newQuestion);
          }
 
      },
      (error) =>{
        console.error(error);
       
      });  



  }

  public openModal(score:any): void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '600px';
  

    this.dialog.open(QuizResultComponent,dialogConfig);

  }
  public sendQuiz(): void{
  
      var score = 0;
      var numberOfQuestions = this.questions.length; // fiecare quiz are numar par de intrebari

      for (const question of this.questions) {
        if(question['correctAnswer'] === question['selectedOption'] ){
          score+= 20;
        }
    }

    var myQuiz = {
      idQuiz:this.idQuiz,
      score:score,
    };
    this.dataService.changeQuizData(myQuiz);
    this.openModal(score);
   

  }


  shuffle(array: any[]) {
    let currentIndex = array.length;
  
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
}
