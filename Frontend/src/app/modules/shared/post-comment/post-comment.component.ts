import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent {

  public subscription: Subscription | undefined;
  public currPost: any;

  public commentForm: FormGroup = new FormGroup({
    comm: new FormControl('')
  });
  constructor(
    private postsService: PostsService,
    private dataService: DataService,
  ){ }

  //getters

  get comm(): AbstractControl{
    return this.commentForm;
  }

  ngOnInit(){
    this.subscription = this.dataService.currentPost.subscribe(post => this.currPost = post);

  }
  public postComment(): void {
    
    var comment = {
      "commentText": this.comm.value['comm'],
      "postId": this.currPost['id']
    };
console.log(comment);
    this.postsService.putComment(comment).subscribe(
      (result) => {
        console.log(result);
        window.location.reload();

      },
      (error) => {
        console.log(error);
      }
  
     );
  }


}
