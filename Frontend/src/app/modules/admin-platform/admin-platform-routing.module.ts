import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { CreateChapterComponent } from './create-chapter/create-chapter.component';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';
import { ForumManagementComponent } from './forum-management/forum-management.component';
import { ManagementCenterComponent } from './management-center/management-center.component';

const routes: Routes = [
  {
    path: 'center',
    component: ManagementCenterComponent
  },
  {
    path: 'create-quiz',
    component: CreateQuizComponent
  },
  {
    path: 'create-chapters',
    component: CreateChapterComponent
  },
  {
    path: 'create-lessons',
    component: CreateLessonComponent
  },
  {
    path: 'forum-management',
    component: ForumManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPlatformRoutingModule { }
