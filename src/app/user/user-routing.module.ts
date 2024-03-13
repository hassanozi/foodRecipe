import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

const routes: Routes = [
  { path: '', component: UserComponent,children:[
    { path: 'recipes', loadChildren: () => import('../user/components/user-recipes/user-recipes.module').then(m => m.UserRecipesModule) },
    {path:'favorites', loadChildren: () => import('../user/components/favorites/favorites.module').then(m => m.FavoritesModule) },
    {path:'profile', loadChildren: () => import('../user/components/profile/profile.module').then(m => m.ProfileModule) },
    {path:'changepassword', component:ChangepasswordComponent}

  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
