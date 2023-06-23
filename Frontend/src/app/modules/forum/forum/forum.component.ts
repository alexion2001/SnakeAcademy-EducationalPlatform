import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { StudentsService } from 'src/app/services/students.service';
import { PostCommentComponent } from '../../shared/post-comment/post-comment.component';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  public imageIndex:any;
  public posts = [];
  public fullName:any;
  public loggedUser:any;
  public numberOfLikes: number[] = [];
  public numberOfComments: number[] = [];
  public validLikes: boolean[] = [];


  constructor(
    private router: Router,
    private postsService: PostsService,
    private studentService: StudentsService,
    public dialog: MatDialog,
    private dataService: DataService,
  ){
    
  }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('Id');
    //get the posts
    this.postsService.getAllPosts().subscribe(
      (result) => {    
        this.posts= result.reverse(); //ordonate in ordinea postarii lor
        console.log(result);
        for (let post of this.posts) {
          //count number of likes and comments
          let likes: any[] = post['likes'];
          let numb = likes.length;
          this.numberOfLikes.push(numb);

          let comme: any[] = post['comments'];
          let numb2 = comme.length;
          this.numberOfComments.push(numb2);

          //search for liked post by current user
          let ok = false;
          for (let like of likes) {
            if (String(like['userId']) == this.loggedUser){
              ok = true;
            }
           
          }
          this.validLikes.push(ok); //true or false like
        }
        
console.log(this.validLikes);
        
         
        
      },
      (error) =>{
        console.error(error);
      }
    );

  }

  public updateLikesPlus(idPost:any){
    let like = {
      "postId": idPost,
      "userId": this.loggedUser
    };
    console.log(like);
    this.postsService.putLike(like).subscribe(
      (result) => {

        window.location.reload();
      },
      (error) =>{
        console.error(error);
      }
    );
  }





  getComments(id:any){
    const  commentSection = document.getElementById("comment"+id);  
    const style = window.getComputedStyle(commentSection!);
    if (style.display === "none") {
      commentSection!.style.display = "block";
    } else {
      commentSection!.style.display = "none";
    }

    }


public post(){
  var subject = (<HTMLInputElement>document.getElementById('postSubject')).value;
  var msg = (<HTMLInputElement>document?.getElementById('postMsg')).value;
  const post = {
    "postSubject": subject,
    "postText": msg,
    "userId": localStorage.getItem('Id')
  }
  this.postsService.putPost(post).subscribe(
    (result) => {
    },
    (error) =>{
      console.error(error);
    }
  );

}

public postComment(id:any){

  var myPost = {
    'id': id,
  };

  this.dataService.changePostData(myPost);

  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '400px';
  dialogConfig.height = '200px';

  this.dialog.open(PostCommentComponent,dialogConfig);


}

}
