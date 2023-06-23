import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { StudentsService } from 'src/app/services/students.service';

interface Chapter {
  idChapter: any;
  chapterName: any;
  score: number;
  lessonNumber: number;
  progress: number;
  opacity: number;
  lastLessonNumber: number
};

@Component({
  selector: 'app-chapters-page',
  templateUrl: './chapters-page.component.html',
  styleUrls: ['./chapters-page.component.scss']
})
export class ChaptersPageComponent {

 

  chapters: Chapter[] = [];
  quizzes: { QuizId: number, Score: number, Passed: boolean }[] = [];
  userId:any;
  currentLesson:any; 
  userName: any;
  prg: any;
  currentChapter = 0;
  lastLesson:any;
  chapterForCurrentLesson:any;


  constructor(
    private router:Router,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
   
    ){}

  ngOnInit(): void {
 

    this.userId = localStorage.getItem('Id'); //current user id
    this.userName = localStorage.getItem('Name'); //curent user name
    

    //get student current lessson
    this.studentsService.getStudentInfo(this.userId).subscribe(
      (result) => { 
        this.currentLesson = result['currentLesson']; //lectia curenta  a user-ului
        localStorage.setItem('CurrentLesson',result['currentLesson']);
        localStorage.setItem('LessonToLoad',result['currentLesson']);
        this.coursesService.getLesson(this.currentLesson).subscribe(
          (result) => { 
            this.chapterForCurrentLesson = result['chapterId']; //lectia curenta  a user-ului
            localStorage.setItem('CurrentChapter',this.chapterForCurrentLesson);
            console.log(this.chapterForCurrentLesson);
           },
          (error) =>{
            console.error(error);
           
          });
       },
      (error) =>{
        console.error(error);
       
      });    
  
    
    //detalii capitole
    this.coursesService.getAllChapters(this.userId).subscribe(
      (result) => {         
        var opacity = 0;
        var lastLessonNumber;

        //cautare numar ultima lectie
        var lastChapter = result[result.length - 1]; //salvez ultimul capitol din lista
        var lastChaptersLessons =  lastChapter['lessons'].length; // salvez ultima lectia a ultimul capitol
        this.lastLesson = lastChapter['lessons'][lastChaptersLessons - 1].lessonNumber; // salvez numarul ultimel lectii existente in ultimul capitol
        this.chapterForCurrentLesson = localStorage.getItem('CurrentChapter');
        
        //parcurg toate capitolele
        for (const chapter of result) {  
          
          //salvez datele imporante ale capitolelor si stabiles progresul lor
          if(String(chapter['idChapter']) < this.chapterForCurrentLesson ){ // am finalizat capitolul
            console.log("finalizat",String(chapter['idChapter']),this.chapterForCurrentLesson)
            opacity =1;   
            this.prg = 100;
          }
          else if(String(chapter['idChapter']) > this.chapterForCurrentLesson ){ //nu am ajuns la capitol inca
            console.log("blocat",String(chapter['idChapter']),this.chapterForCurrentLesson)
            opacity = 0.5;         
            this.prg = 0;
          }
          else{ // capitolul curent - calculare progres       
            console.log("in progress",String(chapter['idChapter']),this.chapterForCurrentLesson)
            opacity = 1;   
            this.coursesService.getChapterLessons(chapter['idChapter']).subscribe(
              (result) => {
                var lessonPercent =  Math.floor(100/result.length);
                var lessonPosition = 0;
                for (const lesson of result){ //caut a cata lectie este lectia mea
                  if (this.currentLesson == lesson['lessonNumber']) // am gasit lectia
                  {                
                    console.log("in progress",String(lessonPercent * lessonPosition))
                    localStorage.setItem('lsnProgress',String(lessonPercent * lessonPosition));

                  }
                  else{
                    lessonPosition++;
                  }
                }
          
               },
              (error) =>{
                console.error(error);
               
              });
          
             
              this.currentChapter = -1;
            this.prg = Number(localStorage.getItem('lsnProgress'));
          }

          var index = chapter['lessons'].length - 1;
          lastLessonNumber = chapter['lessons'][index]['lessonNumber'];

          if(chapter['quiz']['quizResults'][0]){
            
            var newChapter = {
              idChapter: chapter['idChapter'],
              chapterName: chapter['chapterName'],
              score: chapter['quiz']['quizResults'][0]['score'],
              lessonNumber:chapter['lessons'].length,
              progress:  this.prg,
              opacity: opacity,
              lastLessonNumber:lastLessonNumber
            };
            this.chapters.push(newChapter);
          }
          else{
            var newChapter2 = {
              idChapter: chapter['idChapter'],
              chapterName: chapter['chapterName'],
              score: 0,
              lessonNumber:chapter['lessons'].length,
              progress:  this.prg,
              opacity: opacity,
              lastLessonNumber:lastLessonNumber
            };
            this.chapters.push(newChapter2);
          }
        }
      
        console.log(this.chapters);
       
      },
      (error) =>{
        console.error(error);
      }
    );


  }

 
  goChapter(id:any, opacity:any, progress:any,lastLessonNumber:any){
    if(opacity == 1){
      localStorage.setItem('ChapterToLoad',id);
      if(progress == 100){ //redirect to last lesson
        localStorage.setItem('LessonToLoad',lastLessonNumber); //redirect tolast lesson number if chapter finished
        this.router.navigate(['lessons']);
      }
      else{ //redirect to lesson in progress
        this.goLesson();
      }
     
    }
    
  }

  goLesson(){
    localStorage.setItem('LessonToLoad',this.currentLesson); //redirect to currentLesson
    
    this.router.navigate(['lessons']);
    
  }




}
