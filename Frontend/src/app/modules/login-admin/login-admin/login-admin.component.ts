import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent {
  public loginForm: FormGroup = new FormGroup({
    email:new FormControl(''),
    password: new FormControl(''),
  });

  hide = true;
  errorMessage = "";

  public loggedIn!: Boolean;
  public user:any;


  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private studentsService: StudentsService

    
  ){  }

//getters

  get email(): AbstractControl {
    return this.loginForm;
  }
  get password(): AbstractControl {
    return this.loginForm;
  }

ngOnInit(): void {
 
}


  goCenter(){  //login
    this.studentsService.putLogin(this.loginForm.value).subscribe(
      (result) => {
        if (result["token"] == "" || this.loginForm.value['email'] != "admin@admin.com"){ //nu am gasit userul in DB
          this.errorMessage = "The email or password is wrong";
         
          this._snackBar.open('The email or password is wrong', 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 2000,
            panelClass: ['warning']
          });
        }
        else{
          localStorage.setItem('Token',result["token"]);
          
          this.studentsService.getStudentId(this.loginForm.value['email']).subscribe(
            (result) => {

              localStorage.setItem('Id',String(result['id']));
              localStorage.setItem('Role','Admin');
              this.router.navigate(['center']);
              
             
            },
            (error) => {
              console.log(error);
            }
          );

        }
        
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );

 }

 goLogin(){
  this.router.navigate(['login']);
 }

}
