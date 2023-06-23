import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { SearchFriendsComponent } from './modules/shared/search-friends/search-friends.component';
import { DataService } from './services/data/data.service';
import { StudentsService } from './services/students.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router:Router,
    private studentsService: StudentsService,
    public dialog: MatDialog,
    private dataService: DataService
  ){  }

  onSubmit(event: Event) {
    event.preventDefault(); // Prevents the form submission and page refresh
    // Handle the form submission
    event.preventDefault(); // Prevents the form submission and page refresh
    var name = (<HTMLInputElement>document.getElementById("friend-to-search")).value;
    const nameToSend = {
      'name': name
    };
    this.dataService.changeSearchData(nameToSend);
    this.openSearchModal();
  }

  public openSearchModal(): void{
    this.dialog.open(SearchFriendsComponent,{
      width: '450px',
      height: '300px',
      position: {right: '7%', top: '5%'}
    });
  }

  search(event: Event) {
    
  }



}