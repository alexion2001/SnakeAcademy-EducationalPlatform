import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss']
})
export class FriendProfileComponent {

  public student = [];
  public idStudent: number | undefined;
  public friends = [];
  public rank: string | undefined;
  public name: string | undefined;
  public bio: string | undefined;
  public lesson: number | undefined;
  public userPoints: number | undefined;

  public subscription: Subscription | undefined;
  public id: any;
  public friendshipStatus: any;

    //avatar setup
    imageIndex = 1;
    imagePath = 'assets/images/snake' + this.imageIndex + '.jpg';

  constructor(
    private router:Router,
    private studentsService: StudentsService,
    public dialog: MatDialog,
    private dataService: DataService,
    private route: ActivatedRoute,
  ){  }

  ngOnInit(){

    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id){
          //get student profile info
          this.studentsService.getStudentInfo(this.id).subscribe( //here I put the actual user Id from login
          (result) => {
            this.student = result;
    
            this.idStudent = result['id'];
            localStorage.setItem("StudentId",String(this.idStudent));
            this.name = result['name'] + " " + result['surname'];
            this.bio = result['studentDescription'];
            this.rank = result['rank'];
            this.lesson = result['currentLesson'];
            this.imageIndex = result['avatarIndex'];
            this.imagePath = 'assets/images/snake' + this.imageIndex + '.jpg';
            this.rank = result['rank'];
            this.userPoints = 0; //aici fac get si suma rezultatelor la quiz-uri -TODO
    
            this.friends = result["friends"];
            
            
          },
          (error) => {
            console.log(error);
          }
        );
      }

          //button status
          const elem = document.getElementById("follow");
          const elem2 = document.getElementById("unfollow");

        this.studentsService.getFriend(this.id,localStorage.getItem('Id')).subscribe( 
            (result) => {
              if (result){          
                elem!.style.display = "none";
                elem2!.style.display = "block";
              }
              else{
                elem!.style.display = "block";
                elem2!.style.display = "none";
              }
            },
            (error) => {
              console.log(error);
            }
          );
      
    });

  }


  public addFriend(friend: any): void {

    this.studentsService.putFriend(friend).subscribe(
      (result) => {
        console.log(result);
        
      },
      (error) => {
        console.log(error);
      }
  
     );
  }

  public deleteFriend(friend: any): void {

    this.studentsService.deleteFriend(friend).subscribe(
      (result) => {
        console.log(result);
        
      },
      (error) => {
        console.log(error);
      }
  
     );
  }

    follow(){
      var newFriend = {
        "idFriend": localStorage.getItem('Id'), // userul care este conectat
        "userId": this.id // user-ul paginii de prieten catre care trimit cererea
      }
      this.addFriend(newFriend);

       //send notification when add the friend
      var newNotification = {
        "message": localStorage.getItem('Name') + ' started following you !',
        "userId": this.id //id-ul prietenului  catre care s-a trimis cererea
      }
      this.addNotification(newNotification);



      window.location.reload();

    }

    unfollow(){
      console.log('sterg');
      var delFriend = {
        "idFriend": localStorage.getItem('Id'), // userul care este conectat
        "userId": this.id // user-ul paginii de prieten catre care trimit cererea
      }
      this.deleteFriend(delFriend);
      window.location.reload();
    }


    //send notification when add the friend
    public addNotification(notification: any): void {

      this.studentsService.putNotification(notification).subscribe(
        (result) => {
          console.log(result);
          
        },
        (error) => {
          console.log(error);
        }
    
       );
    }

}
