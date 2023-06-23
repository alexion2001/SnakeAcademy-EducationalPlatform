import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-edit-student-bio',
  templateUrl: './edit-student-bio.component.html',
  styleUrls: ['./edit-student-bio.component.scss']
})

export class EditStudentBioComponent  implements OnInit{

  public descriptionForm: FormGroup = new FormGroup({
    bio: new FormControl('I love python')
  });
  constructor(
    private studentsService: StudentsService,
  ){ }

  //getters

  get bio(): AbstractControl{
    return this.descriptionForm;
  }

  

  ngOnInit(): void {
   
  }
  public updatebio(idUser: string,bio: string): void {
    
    this.studentsService.updateBio(idUser,bio).subscribe(
      (result) => {
        console.log(result);

      },
      (error) => {
        console.log(error);
      }
  
     );
  }

  public saveBio(): void {
    var idStudent = localStorage.getItem("Id");
    this.updatebio(idStudent!,this.bio.value['bio']);
    window.location.reload();


  }

}
