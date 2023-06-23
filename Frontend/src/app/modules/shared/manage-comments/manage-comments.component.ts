import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.scss']
})
export class ManageCommentsComponent {

  public subscription: Subscription | undefined;
  public currPost: any;
  public comments = [];

  displayedColumns = ['idComment','commentText','delete'];

  constructor(
    private postsService: PostsService,
    private dataService: DataService,
  ){ }

  
  ngOnInit(){
    this.subscription = this.dataService.currentPost.subscribe(post => this.currPost = post);  
     var postId = this.currPost['id'];   

    this.postsService.getPostComments(postId).subscribe(
      (result) => {
        this.comments = result;
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
  
     );

  }

  public deleteComment(id:any){
    this.postsService.deleteComment(id).subscribe(
      (result) => {
        window.location.reload();
        
      },
      (error) => {
        console.log(error);
      }
  
     );
  }

}
