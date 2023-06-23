import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { EditLessonComponent } from 'src/app/shared/edit-lesson/edit-lesson/edit-lesson.component';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss']
})
export class CreateLessonComponent {
  @ViewChild('exempleRTE')
  public componentObject! : RichTextEditorComponent;

  public lessons = [];
  public chapters = [];
  displayedColumns: string[] = ['idLesson', 'lessonNumber','lessonName','chapterId','editLesson'];

  public customToolbar: Object={
    items: ['Bold','Italic','Underline','UnorderedList','FontSize','FontColor','BackgroundColor', 'Alignments', '|','Indent','Outdent']
  };

  private buttonElement! : HTMLElement | null;
  private htmlConentent! : string;

  public lessonForm: FormGroup = new FormGroup({
    lessonNumber:new FormControl(''),
    lessonName:new FormControl(''),
    videoLink:new FormControl(''),
    chapterId:new FormControl(''),
   
  });

  
  constructor(
    private router: Router,
    private coursesService: CoursesService,
    public dialog: MatDialog,
   
  ){
    
  }


  ngOnInit(): void {
    this.coursesService.getAllLesson().subscribe(
      (result) => {    
        this.lessons= result;

      },
      (error) =>{
        console.error(error);
      }
    );

    this.coursesService.getChapters().subscribe(
      (result) => {    
        this.chapters= result;
        console.log(result);
      },
      (error) =>{
        console.error(error);
      }
    );



  }

  createLesson(){
    

    this.buttonElement = document.getElementById('crt-lsn');
    this.htmlConentent = this.componentObject.getHtml();
    console.log(this.htmlConentent);

    var paragraph = document.getElementById("result");
      paragraph!.innerHTML = this.htmlConentent;

   //trb decomentata

 var newLesson = {
  "lessonNumber": this.lessonForm.value['lessonNumber'],
  "lessonName": this.lessonForm.value['lessonName'],
  "videoLink": this.lessonForm.value['videoLink'],
  "lessonContent": this.htmlConentent,
  "chapterId": this.lessonForm.value['chapterId']
};
console.log(newLesson);
    this.coursesService.putLesson(newLesson).subscribe(
      (result) => {
      window.location.reload();  

      },
      (error) => {
        console.log(error);
      }
    );
   }

   editLesson(id: any, numberId: any){
    localStorage.setItem("LessonToEdit", String(numberId));
    localStorage.setItem("LessonIdToEdit", String(id));

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.height = '700px';

    this.dialog.open(EditLessonComponent,dialogConfig);
   }


}
