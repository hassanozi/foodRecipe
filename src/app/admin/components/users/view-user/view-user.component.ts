import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../users.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit{

  constructor(private router: Router, private _ActivatedRoute: ActivatedRoute,private _ToastrService: ToastrService,
    private _UsersService:UsersService) {
    this.viewUserId = _ActivatedRoute.snapshot.params['id'];
  }
 
  ngOnInit(): void {
    if (this.viewUserId) {
      this.getUserById(this.viewUserId);
    }
  }


  viewUserId: number = 0;
  userData :any;

  userForm = new FormGroup({
    id: new FormControl(null),
    userName: new FormControl(null),
    email: new FormControl(null),
    country: new FormControl(null),
    phoneNumber: new FormControl(null),
    imagePath: new FormControl(null),
    group: new FormControl(null),
  })

  
  getUserById(id: number) {
    this._UsersService.getUserById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.userData = res;
      }, error: () => {

      }, complete: () => {

       
        this.userForm.patchValue({
          id: this.userData.id,
          userName: this.userData.userName,
          email: this.userData.email,
          country: this.userData.country,
          phoneNumber:this.userData.phoneNumber,
          imagePath: this.userData.imagePath, 
          group: this.userData.group.name,
        })
      }
    })
  }
}













