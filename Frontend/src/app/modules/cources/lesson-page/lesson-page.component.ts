import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { ConfirmNextLessonComponent } from '../../shared/confirm-next-lesson/confirm-next-lesson.component';
import { DomSanitizer } from '@angular/platform-browser';



interface Lessson {
  lessonName:any,
  lessonNumber:any,
  active: any
};

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss']
})
export class LessonPageComponent {
  userId: any;
  chapterId:any;
  lessonId:any;
  lessonContent:any;
  currentLessonId:any;
  lastLessonNumber:any; //last lesson in chapter

  lessons = [];
  public currentLoadedLesson:any ;
  sideLessons: Lessson[] = [];
  quiz:any;
  quizAvalabile:any
  quizOpacity:any
  videoUrl:any;
  constructor(
    private router:Router,
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ){
   
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('Id');
    this.chapterId = localStorage.getItem('ChapterToLoad');
    this.lessonId = localStorage.getItem('LessonToLoad');
    this.currentLessonId = localStorage.getItem('CurrentLesson');
   

  this.coursesService.getChapterLessons( this.chapterId).subscribe(
    (result) => { 
      this.lessons = result;
      this.lastLessonNumber = result[result.length-1].lessonNumber;
      this.quizAvalabile = true;
      this.quizOpacity = 1;
      for (const lsn of result){
        var active;
        if(lsn['lessonNumber'] <= this.currentLessonId){
          active = 1;
        }
        else{
          active = 0.5;
          this.quizAvalabile = false;
          this.quizOpacity = 0.5;
        }
        var newLesson = {
          'lessonName':lsn['lessonName'],
          'lessonNumber':lsn['lessonNumber'],
          'active': active
        };
        this.sideLessons.push(newLesson);

      }
     
  
     },
    (error) =>{
      console.error(error);
     
    });    

    this.coursesService.getQuiz(this.chapterId).subscribe(
      (result) => { 
        this.quiz = result;
        
       },
      (error) =>{
        console.error(error);
       
      });  

      this.coursesService.getLesson(this.lessonId).subscribe(
        (result) => { 
          this.currentLoadedLesson = result;
          if(this.currentLoadedLesson['videoLink'] != 'nu avem'){
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentLoadedLesson['videoLink']);
          }
          else{
            var videoDiv = document.getElementById('videos');
            videoDiv!.style.display = 'none';
          }

          var lsnContent = document.getElementById("content");
          lsnContent!.innerHTML = this.currentLoadedLesson['lessonContent'];
        
         },
        (error) =>{
          console.error(error);
         
        });  

  }

  public openModal(): void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '350px';
    dialogConfig.height = '210px';
    dialogConfig.closeOnNavigation = true;
  

    this.dialog.open(ConfirmNextLessonComponent,dialogConfig);

  }

  goLesson(lessonNumber: any){
    if(lessonNumber <= this.currentLessonId){
    localStorage.setItem('LessonToLoad',lessonNumber);
    window.location.reload();
    }
    else if(lessonNumber == (Number(this.currentLessonId) + 1)){ //vreau sa dau load la lectia urmatoare in progres
      this.openModal();
    }
  }

  goQuiz(id: any){  //quiz id 
    if(this.quizAvalabile){
      this.router.navigate(['./quiz']);
    }  
  }


  nextPage(){
      this.goLesson(this.currentLoadedLesson.lessonNumber + 1);
  }

}
