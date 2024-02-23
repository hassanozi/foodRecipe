import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

interface Menu{
  text:string;
  link : string;
  icon : string;
  isActive : boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private _AuthService:AuthService){}

    isAdmin() : boolean{
      return this._AuthService.role == 'SuperAdmin'? true:false
    }

    isUser() : boolean{
      return this._AuthService.role == 'SystemUser'? true:false
    }

     Menue : Menu[] = [
      {text:'home',link:'/dashboard/home',icon:'fa-solid fa-house',isActive:this.isAdmin()|| this.isUser()},
      {text:'users',link:'home1',icon:'fa-solid fa-house',isActive:this.isAdmin()},
      {text:'Recipes',link:'home2',icon:'fa-solid fa-house',isActive:this.isAdmin()},
      {text:'Category',link:'home3',icon:'fa-solid fa-house',isActive:this.isAdmin()},
      {text:'User Recipes',link:'home4',icon:'fa-solid fa-house',isActive:this.isUser()},
      {text:'Favorites',link:'home5',icon:'fa-solid fa-house',isActive:this.isUser()},
    ];
}
