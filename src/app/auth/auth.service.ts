import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../shared/login';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 
    if(this.token !== null){
         this.getProfile();

    }
  }

  token=localStorage.getItem('token');
  role:string | any ='';

  onLogin(data:ILogin){
    return this.http.post('Users/Login',data);
  }

  onVerify(data:any){
    return this.http.put('Users/verify',data);
  }

  onRegister(data:any){
    return this.http.post('Users/Register',data);
  }

  getProfile(){
    let encoded:any=this.token;
    let decoded:any = jwtDecode(encoded);
    localStorage.setItem('userRole',decoded.userGroup);
    localStorage.setItem('userName',decoded.userName);

    this.getRole()
  }

  getRole(){
    if(localStorage.getItem('token')!==null && localStorage.getItem('userRole')!==null)
    {
      this.role = localStorage.getItem('userRole');
    }
  }
}
