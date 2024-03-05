import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Routes = [
  { path: '', component: AdminComponent,children:[
    { path: 'recipes', loadChildren: () => import('../admin/components/recipes/recipes.module').then(m => m.RecipeModule) },
    { path: 'users', loadChildren: () => import('../admin/components/users/users.module').then(m => m.UsersModule) },
    {path:'category', component:CategoriesComponent},

  ] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
