import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  hide:boolean =true;
  isLoading:boolean=false;
  showpassword =false;

  constructor(private _AuthService:AuthService, private _toaster:ToastrService){}

    loginForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,Validators.required)
    })
  
  toggleShow(){
    this.showpassword = !this.showpassword;
  }
  
  ngOnInit(): void {
    
  }

  onSubmit(data:FormGroup){
    this.isLoading=true;
    console.log(data.value)
    this._AuthService.onLogin(data.value).subscribe({
      next:(res)=>{
        console.log(res);
        
        // localStorage.setItem('token', res.token)

      },error:(err:any)=>{
        console.log(err)
        this.isLoading =false;
        this._toaster.error('Hello world!', 'Toastr fun!');
      }, complete:()=>{
        this.isLoading =false;
        this._toaster.success('Hello world!', 'Toastr fun!');
      }
    })
  }

}
