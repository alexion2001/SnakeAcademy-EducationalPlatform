import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss']
})
export class CreateChapterComponent implements OnInit{
  public chapters = [];
  displayedColumns: string[] = ['idChapter', 'chapterName','lessons','quizId'];
  displayedColumns2: string[] = ['idChapter', 'lessonNumber','lessonName'];

  public chapterForm: FormGroup = new FormGroup({
    chapterName:new FormControl(''),
   
  });

  public question1Form: FormGroup = new FormGroup({
    questionText:new FormControl(''),
    correntAnswer:new FormControl(''),
    wrongAnswer1:new FormControl(''),
    wrongAnswer2:new FormControl(''),
   
  });

  public question2Form: FormGroup = new FormGroup({
    questionText:new FormControl(''),
    correntAnswer:new FormControl(''),
    wrongAnswer1:new FormControl(''),
    wrongAnswer2:new FormControl(''),
   
  });

  public question3Form: FormGroup = new FormGroup({
    questionText:new FormControl(''),
    correntAnswer:new FormControl(''),
    wrongAnswer1:new FormControl(''),
    wrongAnswer2:new FormControl(''),
   
  });

  public question4Form: FormGroup = new FormGroup({
    questionText:new FormControl(''),
    correntAnswer:new FormControl(''),
    wrongAnswer1:new FormControl(''),
    wrongAnswer2:new FormControl(''),
   
  });
  public question5Form: FormGroup = new FormGroup({
    questionText:new FormControl(''),
    correntAnswer:new FormControl(''),
    wrongAnswer1:new FormControl(''),
    wrongAnswer2:new FormControl(''),
   
  });

  constructor(
    private router: Router,
    private coursesService: CoursesService,
  ){
    
  }

  get chapterName(): AbstractControl {
    return this.chapterForm;
  }

 

 
  ngOnInit(): void {
    //get the posts
    this.coursesService.getChapters().subscribe(
      (result) => {    
        this.chapters= result;
      },
      (error) =>{
        console.error(error);
      }
    );

  }

  createChapter(){
   
    this.coursesService.putChapter(this.chapterForm.value).subscribe(
      (result) => {
        var idChapter = result['idChapter'];
        var newQuiz = {
          "chapterId": idChapter,
          "questions": [
            this.question1Form.value,
            this.question2Form.value,
            this.question3Form.value,
            this.question4Form.value,
            this.question5Form.value
          ]
        };
    
        
        this.coursesService.putQuiz(newQuiz).subscribe(
          (result) => {      
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );

      },
      (error) => {
        console.log(error);
      }
    );
  }

}
