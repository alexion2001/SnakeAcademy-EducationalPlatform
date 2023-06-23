import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPlatformRoutingModule } from './admin-platform-routing.module';
import { ForumManagementComponent } from './forum-management/forum-management.component';
import { CreateChapterComponent } from './create-chapter/create-chapter.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';
import { MaterialModule } from '../material/material.module';
import { ManagementCenterComponent } from './management-center/management-center.component';


@NgModule({
  declarations: [
    ForumManagementComponent,
    CreateChapterComponent,
    CreateQuizComponent,
    CreateLessonComponent,
    ManagementCenterComponent
  ],
  imports: [
    CommonModule,
    AdminPlatformRoutingModule,
    MaterialModule,  
  ]
})
export class AdminPlatformModule { }
