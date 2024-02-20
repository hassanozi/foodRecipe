import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  hide:boolean =true;
  isLoading:boolean=false;

  constructor(private _AuthService:AuthService, private _toaster:ToastrService, private _Router:Router){}

    forgetPasswordForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
    })
  
  

  onSubmit(data:FormGroup){
    this.isLoading=true;
    console.log(data.value)
    this._AuthService.forgetPassword(data.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._Router.navigate(['/auth/reset-password']);
      },error:(err)=>{
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
