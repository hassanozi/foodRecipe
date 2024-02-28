import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }

  getAllCategories(x:number,y:number,z:string):Observable<any>{
    return this._HttpClient.get('Category',{params:{pageSize:x,pageNumber:y, name:z}});
  }

  onAddCategory(data:string):Observable<any> {
    return this._HttpClient.post('Category',{name:data})
  }

  onEditCategory(data:any):Observable<any> {
    return this._HttpClient.put(`Category/${data.id}`,{name:data.name})
  }

  onDeleteCategory(id:number):Observable<any> {
    return this._HttpClient.delete(`Category/${id}`)
  }
}
