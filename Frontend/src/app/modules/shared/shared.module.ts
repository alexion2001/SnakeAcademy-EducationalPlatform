import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditStudentBioComponent } from './edit-student-bio/edit-student-bio.component';
import { MaterialModule } from '../material/material.module';
import { GetNotificationsComponent } from './get-notifications/get-notifications.component';
import { SearchFriendsComponent } from './search-friends/search-friends.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { ConfirmNextLessonComponent } from './confirm-next-lesson/confirm-next-lesson.component';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';



@NgModule({
  declarations: [
    EditStudentBioComponent,
    GetNotificationsComponent,
    SearchFriendsComponent,
    PostCommentComponent,
    QuizResultComponent,
    ConfirmNextLessonComponent,
    ManageCommentsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    EditStudentBioComponent,
    GetNotificationsComponent,
    SearchFriendsComponent
  ]
})
export class SharedModule { }
