import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-confirm-next-lesson',
  templateUrl: './confirm-next-lesson.component.html',
  styleUrls: ['./confirm-next-lesson.component.scss']
})
export class ConfirmNextLessonComponent {
  userId: any;
  lessonId: any;
  chapterId: any;
  lastLesson: any;
  lastChapterLesson: any;
 
  constructor(
    private router: Router,
    private coursesService: CoursesService
  ){ }

  

  ngOnInit(): void {
    this.userId = localStorage.getItem('Id');
    this.lessonId = localStorage.getItem('LessonToLoad');
    this.chapterId = localStorage.getItem('ChapterToLoad');

    this.coursesService.getChapterLessons(this.chapterId).subscribe( //ultima lectia a capitolului curent
        (result) => { 
         this.lastChapterLesson = result[result.length - 1].lessonNumber;
         },
        (error) =>{
          console.error(error);
         
        }); 

      this.coursesService.getChapters().subscribe( //ultima lectie existenta
          (result) => { 
            var lastChapter = result[result.length - 1];
            var lastChaptersLessons =  lastChapter['lessons'].length;
            this.lastLesson = lastChapter['lessons'][lastChaptersLessons - 1].lessonNumber;
           },
          (error) =>{
            console.error(error);
           
          }); 
    }
   

  unlockLesson(){
    
    if(this.lessonId == this.lastLesson || this.lessonId == this.lastChapterLesson){//cazul 1 - este o lectie de final 
        
        if(Number(this.lessonId) + 1 > Number(this.lastLesson)){
          console.log('ai terminat lectiile')
        }
        else{ //trec la lectia din urmatorul capitol
          console.log('urmatorul capitol')
          var nextLsn = Number(this.lessonId) + 1;
          localStorage.setItem('LessonToLoad',String(nextLsn));
          localStorage.setItem('CurrentLesson',String(nextLsn));
          localStorage.setItem('CurrentChapter',String(this.chapterId)); // salvez capitolul curent pentru calcul progres
          this.coursesService.updateLesson(this.userId).subscribe(
            (result) => { 
             },
            (error) =>{
              console.error(error);
             
            }); 
        }

         // daca e lectie finala de capitol next = quiz
         this.goQuiz();
      
    }
    else//cazul 2 - nu este o lectie de final => incarc urmatoarea lectie
    {
      var nextLsn = Number(this.lessonId) + 1;
      localStorage.setItem('LessonToLoad',String(nextLsn));
      localStorage.setItem('CurrentLesson',String(nextLsn));
      localStorage.setItem('CurrentChapter',String(this.chapterId)); // salvez capitolul curent pentru calcul progres
        this.coursesService.updateLesson(this.userId).subscribe(
        (result) => { 
         window.location.reload();
         },
        (error) =>{
          console.error(error);
         
        }); 

    }

  }

  goQuiz(){  //quiz id 
      this.router.navigate(['./quiz']); 
  }

}
