import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { RankPageComponent } from './rank-page/rank-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'forum',
    pathMatch: 'full'
  },
  {
    path: 'forum',
    component: ForumComponent,
  },
  {
    path: 'tops',
    component: RankPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
