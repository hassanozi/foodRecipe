import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  length = 50;
  pageSize = 5;
  pageNumber = 1;
  tableResponse: any;
  tableData: any[] = [];
  pageSizeOptions = [5, 10, 25];
  pageEvent?: PageEvent;
  imagePath : string = 'https://upskilling-egypt.com/';
  searchkey:string='';

  constructor(private _UsersService: UsersService, private _ToastrService: ToastrService) { }


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {

    let paramsApi = {
      pageSize : this.pageSize,
      pageNumber:this.pageNumber
    }

    this._UsersService.getAllUsers(paramsApi).subscribe({
      next: (res) => {
        console.log(res);
        this.tableResponse = res;
        this.tableData = res.data;
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageNumber = this.tableResponse?.pageNumber;
    this.getUsers();
  }
  

  // getUser(){
  //   this._UsersService.getUserById(this.searchkey).subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //     }
  //   })
  // }


}
