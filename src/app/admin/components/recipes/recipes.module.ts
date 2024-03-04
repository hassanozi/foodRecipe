import { NgModule } from '@angular/core';

import {MatTableModule} from '@angular/material/table';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';

@NgModule({
  declarations: [
    RecipesComponent,
    AddEditRecipeComponent
  ],
  imports: [
    RecipesRoutingModule,
    MatTableModule,
    SharedModule
  ]
})
export class RecipeModule { }
