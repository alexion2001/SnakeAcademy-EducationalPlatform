import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileGuard } from './profile.guard';
import { AdminPlatformModule } from './modules/admin-platform/admin-platform.module';
import { AdminGuard } from './admin.guard';


const routes: Routes = [ // MODULES routes
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
  {
    path: '',
    canActivate: [ProfileGuard],
    children: [
      {
        path: 'profile',
        loadChildren: () => import('src/app/modules/profile/profile.module').then(m => m.ProfileModule),
        title: 'Snake Academy'
      },
      {
        path: 'community',
        loadChildren: () => import('src/app/modules/forum/forum.module').then(m => m.ForumModule),
        title: 'Snake Academy'
      },
      {
        path: '',
        loadChildren: () => import('src/app/modules/cources/cources.module').then(m => m.CourcesModule),
        title: 'Snake Academy'
      },      
    ]
  },
  {
    path: '',
    loadChildren: () => import('src/app/modules/homepage/homepage.module').then(m => m.HomepageModule),
    title: 'Snake Academy'
  },
  {
    path:'',
    loadChildren: () => import('src/app/modules/login-admin/login-admin.module').then(m => m.LoginAdminModule)
  },
  {
    path: '',
    canActivate: [AdminGuard],
    children: [
      {
        path:'',
        loadChildren: () => import('src/app/modules/admin-platform/admin-platform.module').then(m => m.AdminPlatformModule)
      },   
    ]
  },
  {
    path:'**',
    loadChildren: () => import('src/app/modules/not-found/not-found.module').then(m => m.NotFoundModule)
  }

 
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
