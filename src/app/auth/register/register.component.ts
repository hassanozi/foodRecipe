import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { VerifyAccountComponent } from '../verify-account/verify-account.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide: boolean = true;
  isLoading: boolean = false;
  showpassword = false;
  imgSrc: any;

  constructor(private _AuthService: AuthService, private _toaster: ToastrService,public dialog: MatDialog, private _Router:Router) { }

  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    confirmPassword: new FormControl(null, Validators.required)
  })

  toggleShow() {
    this.showpassword = !this.showpassword;
  }

  ngOnInit(): void {

  }

  onSubmit(data: FormGroup) {

    let myData = new FormData();
    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('country', data.value.country);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('password', data.value.password);
    myData.append('confirmPassword', data.value.confirmPassword);
    myData.append('profileImage', this.imgSrc);

    this.isLoading = true;
    console.log(data.value)
    this._AuthService.onRegister(myData).subscribe({
      next: (resp) => {
        console.log(resp)
      }, error: (err: any) => {
        console.log(err)
        this.isLoading = false;
        this._toaster.error('Hello world!', 'Toastr fun!');
      }, complete: () => {
        this.isLoading = false;
        this._toaster.success('Hello world!', 'Toastr fun!');
        this.openDialog()
      }
    })
  }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0];
    console.log(this.imgSrc);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  openDialog(){
    const dialogRef = this.dialog.open(VerifyAccountComponent, {
      data: {name: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if (result){
        this.onVerifyAccount(result);
      }
    });
  }

  onVerifyAccount(data:any){
    this._AuthService.onVerify(data).subscribe({
      next:(res)=>{
        console.log(res);
      }, error: (err: any) => {
        console.log(err)
        this._toaster.error('Hello world!', 'Toastr fun!');
      }, complete: () => {
        this._toaster.success('Account Activated Successfully','Success');
        this._Router.navigate(['../login'])
      }
    })
  }
}
