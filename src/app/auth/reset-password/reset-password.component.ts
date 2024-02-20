import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  showpassword = false;
  isLoading: boolean = false;

  constructor(private _AuthService: AuthService, private _toaster: ToastrService, private _Router:Router) { }

  resetForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    seed: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)])
  })

 toggleShow() {
    this.showpassword = !this.showpassword;
  }

  onSubmit(data:FormGroup){
    this.isLoading=true;
    console.log(data.value)
    this._AuthService.resetPassword(data.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._Router.navigate(['/auth/login']);

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
