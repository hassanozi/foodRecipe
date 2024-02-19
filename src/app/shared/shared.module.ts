import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,ReactiveFormsModule,HttpClientModule,MatDialogModule
  ],
  exports:[ReactiveFormsModule,HttpClientModule,MatDialogModule]
})
export class SharedModule { }
