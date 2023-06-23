import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormGroup, FormControl, ValidatorFn, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';
import { MatSnackBar } from '@angular/material/snack-bar';


//socila login
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup = new FormGroup({
    firstName:new FormControl('',Validators.required),
    lastName:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    confirmPassword:new FormControl('',Validators.required),
  },
  {
    //validators: this.Match('password', 'confirmPassword'),
  });

  hide = true;
  matcher = new ErrorStateMatcher();
  errorMessage = "";

  public loggedIn!: Boolean;
  public user:any;
  
  constructor(
    private router: Router,
    private studentsService: StudentsService,
    private _snackBar: MatSnackBar,
    private authService: SocialAuthService
  ){  }



  //getters

  get firstName(): AbstractControl {
    return this.registerForm;
  }
  get lastName(): AbstractControl {
    return this.registerForm;
  }
  get email(): AbstractControl {
    return this.registerForm;
  }
  get password(): AbstractControl {
    return this.registerForm;
  }
  get confirmPassword(): AbstractControl {
    return this.registerForm;
  }
  get f(){
    return this.registerForm.controls;
  }

  Match(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
       const passwordControl = formGroup.controls[password];
       const confirmPasswordControl = formGroup.controls[confirmPassword];
 
       if(confirmPasswordControl.errors && !confirmPasswordControl.errors['match']){
         return null;
       }
 
       if(passwordControl.value !== confirmPasswordControl.value){
         confirmPasswordControl.setErrors({match:true});
         return { match: true };
       } else {
         confirmPasswordControl.setErrors(null);
         return null;
       }
    };
 }

ngOnInit(): void {
 
}


  goLogin(){
    this.router.navigate(['login']);
  }

  register(){
    var newStudent = {
      "name": this.registerForm.value.firstName,
      "surname": this.registerForm.value.lastName,
      "email": this.registerForm.value.email,
      "password": this.registerForm.value.password
    }
    console.log(newStudent);

    //data validation
    if (this.registerForm.value.password != this.registerForm.value.confirmPassword){
      this.errorMessage ="Passwords don't match!";
      this._snackBar.open("Passwords don't match!", 'X', {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 2000,
      });
    }
    else {
          this.studentsService.putRegister(newStudent).subscribe(
      (result) => {
          this.router.navigate(['login']);       
        console.log(result);
      },
      (error) => {
        this.errorMessage ='User already registered !';
        console.log(error.error);
        this._snackBar.open('User already registered !', 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 2000,
        });

      }
    );

     
    }

  }

  registerWithFacebook(name:any,surname:any,email:any,pass:any){
    var newStudent = {
      "name": name,
      "surname": surname,
      "email": email,
      "password": pass
    }
    console.log(newStudent);
  
      this.studentsService.putRegister(newStudent).subscribe(
      (result) => {
          this.router.navigate(['login']);       
        console.log(result);
      },
      (error) => {
        this.errorMessage ='User already registered !';
        console.log(error.error);
        this._snackBar.open('User already registered !', 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 2000,
        });

      }
    );

  }

  
  signUpWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log();
      this.loggedIn = user != null;
      this.registerWithFacebook(this.user['lastName'],this.user['firstName'],this.user['email'],"User!"+this.user['id']);
    })

  }

  signOut(): void {
    this.authService.signOut();
  }


    
}

