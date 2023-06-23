import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourcesRoutingModule } from './cources-routing.module';
import { ChaptersPageComponent } from './chapters-page/chapters-page.component';
import { LessonPageComponent } from './lesson-page/lesson-page.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ChaptersPageComponent,
    LessonPageComponent,
    QuizPageComponent
  ],
  imports: [
    CommonModule,
    CourcesRoutingModule,
    MaterialModule
  ]
})
export class CourcesModule { }
