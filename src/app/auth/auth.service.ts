import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../shared/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  onLogin(data:ILogin){
    return this.http.post('Users/Login',data);
  }

  onVerify(data:any){
    return this.http.put('Users/verify',data);
  }

  onRegister(data:any){
    return this.http.post('Users/Register',data);
  }

}
