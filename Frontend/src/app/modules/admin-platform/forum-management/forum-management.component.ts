import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ManageCommentsComponent } from '../../shared/manage-comments/manage-comments.component';

@Component({
  selector: 'app-forum-management',
  templateUrl: './forum-management.component.html',
  styleUrls: ['./forum-management.component.scss']
})
export class ForumManagementComponent {

  public posts = [];
  displayedColumns: string[] = ['idPost', 'userId', 'postSubject', 'postText','comms'];
  expandedElement: any | null;

  constructor( 
    private router: Router,
    private postsService: PostsService,
    public dialog: MatDialog,
    private dataService: DataService,
    ){

  }

  ngOnInit(): void {
    //get the posts
    this.postsService.getAllPosts().subscribe(
      (result) => {    
        this.posts= result.reverse(); //ordonate in ordinea postarii lor
    
      },
      (error) =>{
        console.error(error);
      }
    );

  }


  
  commsPost(id:any){

    var myPost = {
      'id': id,
    };
  
    this.dataService.changePostData(myPost);
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.height = '400px';
  
    this.dialog.open(ManageCommentsComponent,dialogConfig);
  }


}
