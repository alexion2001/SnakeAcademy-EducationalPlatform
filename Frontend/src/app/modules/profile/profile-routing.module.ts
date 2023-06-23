import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'friend/:id',
    component: FriendProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
