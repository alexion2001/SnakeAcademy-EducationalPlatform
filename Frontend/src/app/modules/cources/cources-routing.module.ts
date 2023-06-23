import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChaptersPageComponent } from './chapters-page/chapters-page.component';
import { LessonPageComponent } from './lesson-page/lesson-page.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chapters',
    pathMatch: 'full'
  },
  {
    path: 'chapters',
    component: ChaptersPageComponent,
  },
  {
    path: 'lessons',
    component: LessonPageComponent,
  },
  {
    path: 'quiz',
    component: QuizPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourcesRoutingModule { }
