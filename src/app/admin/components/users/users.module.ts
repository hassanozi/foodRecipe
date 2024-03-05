import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ViewUserComponent } from './view-user/view-user.component';



@NgModule({
  declarations: [
    UsersComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,SharedModule,UsersRoutingModule
  ]
})
export class UsersModule { }
