import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../material/material.module';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';


@NgModule({
  declarations: [
    ProfileComponent,
    FriendProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
  ]
})
export class ProfileModule { }
