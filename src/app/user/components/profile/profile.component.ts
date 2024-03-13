import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
 
  constructor(private _UserService:UserService, private _ToastrService:ToastrService){}
  
  ngOnInit(): void {
    this.loadCurrentUser();
  }

  userData:any;
  userId?:number;
  imgSrc: any;
  files: File[] = [];

  userForm = new FormGroup({
    id: new FormControl(null),
    userName: new FormControl(null),
    country: new FormControl(null),
    email: new FormControl(null),
    phoneNumber: new FormControl(null),
    creationDate: new FormControl(null),
    group: new FormControl(null),
    confirmPassword: new FormControl(null),
  })
  
  loadCurrentUser(){
    this._UserService.getProfile().subscribe({
      next:(res)=>{
        console.log(res);
        this.userData = res;

        this.userForm.patchValue({
          userName: this.userData.userName,
          country: this.userData.country,
          email: this.userData.email,
          phoneNumber: this.userData.phoneNumber,
          creationDate: this.userData.creationDate, 
          group: this.userData.group.name,
        })

      },error:(err:any)=>{
        console.log(err);
        
      },complete:()=>{

      }
    })
    
  }

  onSubmit(myData: FormGroup) {
    console.log(myData.value);
    myData.value.id = this.userId;
    let MyData = new FormData();
    MyData.append('userName', myData.value.userName);
    MyData.append('country', myData.value.country);
    MyData.append('email', myData.value.email);
    MyData.append('phoneNumber', myData.value.phoneNumber);
    MyData.append('group', myData.value.group.name);
    MyData.append('confirmPassword', myData.value.confirmPassword);
    MyData.append('profileImage', this.imgSrc);

    this._UserService.updateProfile(MyData).subscribe({
      next: (resp) => {
        console.log(resp)
      }, error: (err: any) => {
        console.log(err)
        this._ToastrService.error(err);
      }, complete: () => {
        this._ToastrService.success('Successfully Done');
      }
    })
  }


  onSelect(event: any) {
    console.log(event);
    const selectedFile = event[0];
    this.imgSrc = event.addedFiles[0];
    console.log(this.imgSrc);
    this.files.push(selectedFile);
    // this.files.push(...event.addedFiles);
  }
}
