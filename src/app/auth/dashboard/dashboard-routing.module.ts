import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from 'src/app/Gaurds/admin.guard';
import { userGuard } from 'src/app/Gaurds/user.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: DashboardComponent ,children:[
      { path: 'home', component: HomeComponent },
      { path: 'user', canActivate:[userGuard],loadChildren: () => import('../../user/user.module').then(m => m.UserModule) }, 
      { path: 'admin',canActivate:[adminGuard], loadChildren: () => import('../../admin/admin.module').then(m => m.AdminModule) },

  ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
