import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteComponent } from './delete/delete.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,HttpClientModule,MatDialogModule,MatIconModule,MatMenuModule,MatButtonModule,
    RouterModule,MatPaginatorModule,FormsModule,MatSelectModule
  ],
  exports:[CommonModule,ReactiveFormsModule,HttpClientModule,MatDialogModule,SidebarComponent,NavbarComponent,MatIconModule,
    MatMenuModule,MatButtonModule,RouterModule,MatPaginatorModule,FormsModule,DeleteComponent,MatSelectModule]
})
export class SharedModule { }
