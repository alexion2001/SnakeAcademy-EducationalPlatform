import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { StudentsService } from 'src/app/services/students.service';

//socila login
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {

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
    private studentsService: StudentsService,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    private authService: SocialAuthService
    
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

  goRegister(){
    this.router.navigate(['register']);
  }

  goProfile(){  //login
    this.studentsService.putLogin(this.loginForm.value).subscribe(
      (result) => {
        if (result["token"] == ""){ //nu am gasit userul in DB
          this.errorMessage = "The email or password is wrong";
         
          this._snackBar.open('The email or password is wrong', 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 2000,
            panelClass: ['warning']
          });
        }
        else{
          //get id and send to profile all the dates
          localStorage.setItem('Token',result["token"]);
          this.getUserId(this.loginForm.value.email);

        }
        
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );

  }


  goProfileWithFb(email:any,pass:any){  //login
    var logStudent = {
      "email": email,
      "password": pass
    };
    this.studentsService.putLogin(logStudent).subscribe(
      (result) => {
        if (result["token"] == ""){ //nu am gasit userul in DB
          this.errorMessage = "The email or password is wrong";
         
          this._snackBar.open('The email or password is wrong', 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 2000,
            panelClass: ['warning']
          });
        }
        else{
          //get id and send to profile all the dates
          localStorage.setItem('Token',result["token"]);
          this.getUserId(email);

        }
        
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );

  }


  getUserId(email:string){
    this.studentsService.getStudentId(email).subscribe(
      (result) => {
        var myUser = {
          'email':email,
          'id':String(result['id']),
        };

      console.log(myUser);

        this.dataService.changeUserData(myUser);
        localStorage.setItem('Id',String(result['id']));
        localStorage.setItem('Role','Student');
        this.router.navigate(['profile']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.goProfileWithFb(this.user['email'],"User!"+this.user['id']);
    })

   
  }

  signOut(): void {
    this.authService.signOut();
  }



}
