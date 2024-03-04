import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllRecipes(x:any):Observable<any>{
    return this._HttpClient.get('Recipe',{params:x});
  }

  getRecipeById(id:number):Observable<any>{
    return this._HttpClient.get(`Recipe/${id}`);
  }

  onAddRecipe(data:any):Observable<any> {
    return this._HttpClient.post('Recipe',data);
  }

  onEditRecipe(id:number,data:any):Observable<any> {
    return this._HttpClient.put(`Recipe/${id}`,data);
  }

  onDeleteRecipe(id:number):Observable<any> {
    return this._HttpClient.delete(`Recipe/${id}`)
  }
}
