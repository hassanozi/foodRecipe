import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ChangepasswordComponent } from 'src/app/user/components/changepassword/changepassword.component';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private dialog: MatDialog,private _AuthService: AuthService, private _Router: Router, 
    private _UserService:UserService, private _ToastrService:ToastrService) { }
  userName = localStorage.getItem('userName');

  myLogout() {
    this._AuthService.logout();
  }

  getCurrentUser() {
    this._Router.navigate(['/dashboard/user/profile']);
  }

  changePasswordRequest() {
    this._Router.navigate(['/dashboard/user/changepassword']);
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangepasswordComponent, {
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.onChangePassword(result);
      }
    });
  }

  onChangePassword(userdata:any){
    this._UserService.changePassword(userdata).subscribe({
      next:(res)=>{
        console.log(res);
      },error:()=>{

      },complete:()=>{
        this._ToastrService.success('Saved Successfuly')
      }
    })
  }


}
