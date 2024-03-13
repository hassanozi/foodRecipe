import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { SearchPipe } from 'src/app/pipes/search.pipe';



@NgModule({
  declarations: [
    UsersComponent,
    ViewUserComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,SharedModule,UsersRoutingModule
  ]
})
export class UsersModule { }
