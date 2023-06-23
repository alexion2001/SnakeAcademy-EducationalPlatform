import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { StudentsService } from 'src/app/services/students.service';
import { EditStudentBioComponent } from '../../shared/edit-student-bio/edit-student-bio.component';
import { GetNotificationsComponent } from '../../shared/get-notifications/get-notifications.component';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  points : number[] = [0,100,150,200,250];

  //user profile info
  public student = [];
  userRanks = ['Baby Snake','Super Snake','Famous Snake']
  hidden = false;

  public idStudent: number | undefined;
  public friends = [];
  public rank:any;
  public name: string | undefined;
  public bio: string | undefined;
  public lesson: number | undefined;
  public userPoints = 0;
  public userPercent: number | undefined;

  //user notifications
  public notifications = [];

    //avatar setup
  imageIndex = 1;
  imagePath = 'assets/images/snake' + this.imageIndex + '.jpg';

  //notification setup
  activIcon = 'notifications_active';
  inactivIcon = 'notifications_none';
  notificationIcon: string | undefined;
  notificationStatus: boolean | undefined;
  public notificationNumber = 0;
  totalPoints:any;

  public subscription: Subscription | undefined;
  public loggedUser: any;
  public id: any;

  
  constructor(
    private router:Router,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ){  }
  

  ngOnInit(){
    this.subscription = this.dataService.currentUser.subscribe(user => this.loggedUser = user);
    this.id = localStorage.getItem("Id");
  
    //get student profile info
    this.studentsService.getStudentInfo(this.id).subscribe( //here I put the actual user Id from login
      (result) => {
        this.student = result;

        this.idStudent = result['id'];
        this.name = result['name'] + " " + result['surname'];
        this.bio = result['studentDescription'];
        this.rank = result['rank'];
        this.lesson = result['currentLesson'];
        localStorage.setItem("CurrentLesson",String(this.lesson));
        this.imageIndex = result['avatarIndex'];
        this.imagePath = 'assets/images/snake' + this.imageIndex + '.jpg';
        this.rank = result['rank'];      

        this.studentsService.getStudentScore(this.id).subscribe( 
        (result) => {
     
          this.userPoints = result['totalScore'];; //aici fac get si suma rezultatelor la quiz-uri           
          this.calculateScore(this.userPoints);
        
        },
        (error) => {
          console.log(error);
        }
      );

        this.friends = result["friends"];

        localStorage.setItem('Name',this.name);

        
      },
      (error) => {
        console.log(error);
      }
    );

    //get student notifications and verify if any new ones
    
    this.studentsService.getStudentNotifications(this.id).subscribe( //here I put the actual user Id from login
    (result) => {
      
      this.notifications = result;
      this.notificationNumber = 0;
      
      this.notificationStatus = false; // nu avem notificari
      for (let noti of result) {
        if (!noti['status']) { //fals = notificare necitita
          this.notificationNumber ++;
          this.notificationStatus = true; //avem notificari
        }

    }

      if (this.notificationStatus){
        this.notificationIcon = this.activIcon;
        this.hidden = false;
      }
      else{
        this.notificationIcon = this.inactivIcon;
        this.hidden = true;
      }

    },
    (error) => {
      console.log(error);
    }
  );


  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  //notifications
  public openNotificationsModal(): void{
   
    this.dialog.open(GetNotificationsComponent,{
      width: '450px',
      height: '500px',
      position: {left: '15%', top: '12%'}
    });
  }

  openNotification(): void{ 
    this.openNotificationsModal();
  }


//rank and send notification
  public updateRank(idUser: string, rankIndex: any): void {
    
    this.studentsService.updateRank(idUser,this.userRanks[rankIndex]).subscribe(
      (result) => {
        //notifica toti urmaritorii de schimbarea rank-ului
        for (let friend of this.friends) {
          var friendId = friend['idFriend'];
          var newNotification = {
            "message": this.name + " won the rank of " + this.userRanks[rankIndex],
            "userId": friendId //id-ul prietenului
          }
          this.addNotification(newNotification);

        }  
        
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        
      },
      (error) => {
        console.log(error);
      }
  
     );
  }

  public addNotification(notification: any): void {

    this.studentsService.putNotification(notification).subscribe(
      (result) => {

        
      },
      (error) => {
        console.log(error);
      }
  
     );
  }


//avatar
  openAvatar(){
    const elem = document.getElementById("avatars");
    if (window.getComputedStyle(elem!).display == 'none'){
      elem!.style.display = "block";
    }
    else{
      elem!.style.display = "none";
    }

    this.disableAvatars();
  }

  public updateAvatar(idUser: string,avatar: string): void {
    
    this.studentsService.updateAvatar(idUser,avatar).subscribe(
      (result) => {
   
        
      },
      (error) => {
        console.log(error);
      }
  
     );
  }

  disableAvatars(){
    if(this.rank == this.userRanks[0]) // baby
    {console.log('0')
      for (let i = 3; i <= 5; i++) { //disable the superior rank avatars
        const buttonAvatar = document.getElementById("avatar" + String(i)) as HTMLButtonElement;
        buttonAvatar!.disabled = true;
        const imgAvatar = document.getElementById("img" + String(i)) as HTMLButtonElement;
        imgAvatar.style.filter = "blur(3px)";
      }
    }
    else if (this.rank == this.userRanks[1]) // middle
    {console.log('1')
      for (let i = 3; i <= 4; i++) { 
        const buttonAvatar = document.getElementById("avatar" + String(i)) as HTMLButtonElement;
        buttonAvatar!.disabled = false; //enable
        const imgAvatar = document.getElementById("img" + String(i)) as HTMLButtonElement;
        imgAvatar.style.filter = "blur(0px)";
      }
      const buttonAvatar = document.getElementById("avatar5") as HTMLButtonElement;
      buttonAvatar!.disabled = true; //disenable
      const imgAvatar = document.getElementById("img5") as HTMLButtonElement;
      imgAvatar.style.filter = "blur(3px)";

    }
    else if (this.rank == this.userRanks[2]){
      for (let i = 3; i <= 5; i++) { //master
        const buttonAvatar = document.getElementById("avatar" + String(i)) as HTMLButtonElement;
        buttonAvatar!.disabled = false; //enable all

        const imgAvatar = document.getElementById("img" + String(i)) as HTMLButtonElement;
        imgAvatar.style.filter = "blur(0px)";
      }
    }

   

  }
  
  choseAvatar(index:number) {
    const elem = document.getElementById("avatars");
    elem!.style.display = "none";

    //update Database
    this.updateAvatar(String(this.id),String(index));
    window.location.reload();
    
  }

//logout
  logout(): void {
    localStorage.setItem('Role','Anonim');
    localStorage.setItem('Id','null');
    localStorage.setItem('Name','null');
    this.router.navigate(['/login']);
  }

  //bio
  public openBioModal(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '200px';

    this.dialog.open(EditStudentBioComponent,dialogConfig);
  }

  openBio(): void{ 
    this.openBioModal();
  }

  public calculateScore(points: number): void{
    this.coursesService.getQuizNumber().subscribe(
      (result) => {
        this.totalPoints = result.length;   

        this.userPercent =points / this.totalPoints

        var newRankIndex; 
        if(this.userPercent <= 30){
          newRankIndex = 0;
        }
        else if(this.userPercent > 80){
          newRankIndex = 2;
        }
        else{
          newRankIndex = 1;
        }

        
        
        if(this.userRanks[newRankIndex] != this.rank){
           
          this._snackBar.open('You have a new rank !', 'X', {           
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 4000,
            panelClass: ['warning']
          });
          this.updateRank(this.id, newRankIndex);
        }
        

      },
      (error) =>{
        console.error(error);
      }
    );
  }



}
