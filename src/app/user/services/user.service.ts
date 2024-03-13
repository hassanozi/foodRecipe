import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChangePassword } from '../models/changePassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient:HttpClient) { }

  getFavs():Observable<any>{
    return this._HttpClient.get('userRecipe');
  }

  onRemoveFromFav(id:number):Observable<any>{
    return this._HttpClient.delete(`userRecipe/${id}`)
  }

  onAddToFav(id:number):Observable<any>{
    return this._HttpClient.post('userRecipe',{recipeId:id})
  }

  getProfile(){
    return this._HttpClient.get('Users/currentUser');
  }

  updateProfile(data:any){
    return this._HttpClient.put('Users',data);
  }

  changePassword(data:any){
    return this._HttpClient.put('Users/ChangePassword',data);
  }
}
