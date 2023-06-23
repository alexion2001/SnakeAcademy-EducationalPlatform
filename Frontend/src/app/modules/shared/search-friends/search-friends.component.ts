import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { StudentsService } from 'src/app/services/students.service';



@Component({
  selector: 'app-search-friends',
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.scss']
})
export class SearchFriendsComponent implements OnDestroy {

  public friends = [];
  public subscription: Subscription | undefined;
  public nameSearched: any;
  
  public displayedColumns = ['avatarIndex', 'name','see-profile'];

  constructor(
    private router: Router,
    private studentService: StudentsService,
    private dataService: DataService
  ){}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(){

    this.subscription = this.dataService.currentSearch.subscribe(user => this.nameSearched = user);

    this.studentService.getSearchFriends(this.nameSearched.name).subscribe( //here I put the actual user Id from login
    (result) => {
      this.friends = result;
      if (this.friends.length == 0){
        const elem = document.getElementById("no-results");   
        elem!.style.display = "block";

      }
      
    },
    (error) => {
      console.log(error);
    }
  );

  }


  public seeProfile(friend: any): void{
    if(String(friend.id) == localStorage.getItem('Id')){
      this.router.navigate(['profile']);
    }
    else{
      this.router.navigate(['profile/friend',String(friend.id)]);
    }
      

  }

  

}
