import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';


@Component({
  selector: 'app-rank-page',
  templateUrl: './rank-page.component.html',
  styleUrls: ['./rank-page.component.scss']
})
export class RankPageComponent {

  public displayedColumns = ['position', 'avatar','name','rank','score','profile'];
  userRanks = ['Baby Snake','Super Snake','Famous Snake']
  ranksBaby = [];
  ranksSuper = [];
  ranksFamous = [];
  public loggedInUserId: any;


  constructor(
    private router:Router,
    private coursesService: CoursesService,

  ){  }
  

  ngOnInit(){
    this.loggedInUserId = Number(localStorage.getItem('Id'));

  
    this.coursesService.getStudentsByRank(this.userRanks[0]).subscribe( //baby
      (result) => {
        this.ranksBaby = result;

        console.log(this.ranksBaby);
        },
        (error) => {
          console.log(error);
        }
      );

      this.coursesService.getStudentsByRank(this.userRanks[1]).subscribe( //super
        (result) => {
          this.ranksSuper = result
          console.log(this.ranksSuper[0]['id'] === this.loggedInUserId);
          },
          (error) => {
            console.log(error);
          }
        );

        this.coursesService.getStudentsByRank(this.userRanks[2]).subscribe( //famous
        (result) => {
          this.ranksFamous = result
          console.log(this.ranksFamous);
          },
          (error) => {
            console.log(error);
          }
        );


  }

}
