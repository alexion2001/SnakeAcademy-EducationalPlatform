import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss']
})
export class EditLessonComponent {
  @ViewChild('exempleRTE')
  public componentObject! : RichTextEditorComponent;

  public customToolbar: Object={
    items: ['Bold','Italic','Underline','UnorderedList','FontSize','FontColor','BackgroundColor', 'Alignments', '|','Indent','Outdent']
  };

  public id: any;
  public lessonNumber: any;

  private buttonElement! : HTMLElement | null;
  private htmlConentent! : string;


  constructor(
    private router: Router,
    private coursesService: CoursesService,
    public dialog: MatDialog,
   
  ){
    
  }

  ngOnInit(): void {
    this.lessonNumber = localStorage.getItem("LessonToEdit"); 
    this.id = localStorage.getItem("LessonIdToEdit"); 
  

    //iau continutul lectiei existente
    this.coursesService.getLesson(this.lessonNumber).subscribe(
      (result) => {    
        console.log(result)
        var p = document.getElementById('lesson-content')
         p!.innerHTML = result['lessonContent'];

      },
      (error) =>{
        console.error(error);
      }
    );
}

updateLesson(){
   
    this.htmlConentent = this.componentObject.getHtml();
    console.log(this.htmlConentent);
    var contentString = String(this.htmlConentent);

    var less = {
      "idLesson": this.id,
      "lessonContent": this.htmlConentent
    }

       //trb decomentata

    this.coursesService.updateLessonContent(less).subscribe(
      (result) => {
      window.location.reload();  

      },
      (error) => {
        console.log(error);
      }
    );
}

}


