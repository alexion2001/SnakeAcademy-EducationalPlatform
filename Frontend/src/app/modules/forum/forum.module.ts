import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumComponent } from './forum/forum.component';
import { MaterialModule } from '../material/material.module';
import { RankPageComponent } from './rank-page/rank-page.component';


@NgModule({
  declarations: [
    ForumComponent,
    RankPageComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    MaterialModule
  ]
})
export class ForumModule { }
