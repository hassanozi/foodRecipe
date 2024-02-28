import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './components/categories/categories.component';
import {MatTableModule} from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { RecipesComponent } from './components/recipes/recipes.component';

@NgModule({
  declarations: [
    AdminComponent,
    CategoriesComponent,
    AddEditCategoryComponent,
    RecipesComponent
  ],
  imports: [
    // CommonModule,
    AdminRoutingModule,
    MatTableModule,
   SharedModule
  ]
})
export class AdminModule { }
