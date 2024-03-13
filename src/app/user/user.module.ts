import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';


@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    SharedModule
  ]
})
export class UserModule { }
