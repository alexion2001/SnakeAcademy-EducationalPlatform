import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-get-notifications',
  templateUrl: './get-notifications.component.html',
  styleUrls: ['./get-notifications.component.scss']
})
export class GetNotificationsComponent implements OnInit{

  //user notifications
  public notifications = [];
  public id: any;
  
  constructor(
    private studentsService: StudentsService,
  ){ }

  

  ngOnInit(): void {
     //get student notifications
     this.id = localStorage.getItem('Id');
     this.studentsService.getStudentNotifications(this.id).subscribe( //here I put the actual user Id from login
     (result) => {
       this.notifications = result;
       for (let noti of result) { //print on Modal
         this.createNotification(noti['message'], noti['friendRequestDate'].slice(0,10), noti['status']);
        }
     },
     (error) => {
       console.log(error);
     }
   );
   
  }

  
  updateStatus(){
      //update la status notificari

      for (let noti of this.notifications) {
        if (!noti['status']) { //fals = notificare necitita

          const id = String(noti['idNotification']);
          this.updateNotificationStatus(id); //update status ca citita
        }
        window.location.reload();
    }
    
  }

  createNotification(text: string, date: string, read: boolean){
    var newNotificationText = document.createElement('div');
    newNotificationText.innerHTML = ' &#8226; ' + text;
    newNotificationText.style.borderBottom = '1px solid #eff0e1';
    newNotificationText.style.padding = '10px';

    var newNotificationDate = document.createElement('p');
    newNotificationDate.innerHTML = date;
    newNotificationDate.style.fontSize = '12px';
    newNotificationDate.style.padding = '10px';

    if(!read){   
      newNotificationText.style.fontSize = '13px';
      newNotificationText.style.fontWeight = "bold" ;
      newNotificationDate.innerHTML += ' &#8226; New';
    }
    
    var notificationPopup = document.getElementById("second-popup");
    notificationPopup!.insertBefore(newNotificationDate, notificationPopup!.children[0]);
    notificationPopup!.insertBefore(newNotificationText, notificationPopup!.children[0]);


  }

  public updateNotificationStatus(idNotification: string): void {
    
    this.studentsService.updateStatus(idNotification).subscribe(
      (result) => {
        console.log(result);
        
      },
      (error) => {
        console.log(error);
      }
  
     );
  }

}
