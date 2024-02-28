import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/models/category';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { CategoryService } from '../../services/category.service';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { RecipesService } from '../../services/recipes.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {

  tableData: any[] = [];
  tags:any[]=[];
  categories:any[]=[];
  tableResponse: any;
  searchkey: string = '';
  imagePath : string = 'https://upskilling-egypt.com/';

  length = 50;
  pageSize = 5;
  pageNumber = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent?: PageEvent;


  constructor(private _RecipesService: RecipesService, private dialog: MatDialog,
    private _CategoryService:CategoryService, private _ToastrService: ToastrService,private _HelperService:HelperService) { }


  ngOnInit(): void {
    this.getRecipes();
    this.getAllTages();
    this.getAllCategories();
  }

  getRecipes() {

    let paramsApi = {
      pageSize : this.pageSize,
      pageNumber:this.pageNumber,
      name:this.searchkey
    }

    this._RecipesService.getAllRecipes(paramsApi).subscribe({
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
    this.getRecipes();
  }

  // openAddCategoryDialog() {
  //   const dialogRef = this.dialog.open(AddEditCategoryComponent, {
  //     // data: {name: this.name, animal: this.animal},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this.addCategory(result);
  //     }
  //   });
  // }

  // openEditCategoryDialog(CategoryData: any) {
  //   console.log(CategoryData);

  //   const dialogRef = this.dialog.open(AddEditCategoryComponent, {
  //     // data: {name: this.name, animal: this.animal},
  //     data: CategoryData
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this.editCategory(result);
  //     }
  //   });
  // }

  // openDeleteCategoryDialog(CategoryData: any) {
  //   const dialogRef = this.dialog.open(DeleteComponent, {
  //     // data: {name: this.name, animal: this.animal},
  //     data: CategoryData
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this.deleteCategory(result);
  //     }
  //   });
  // }

  // addCategory(categoryName: string) {
  //   this._RecipesService.onAddCategory(categoryName).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     }, error: () => {

  //     }, complete: () => {
  //       this._ToastrService.success('Add Successfuly')
  //       this.getCategories();
  //     }
  //   })
  // }

  // editCategory(categoryItem: any) {
  //   this._RecipesService.onEditCategory(categoryItem).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     }, error: () => {

  //     }, complete: () => {
  //       this._ToastrService.success('edit Successfuly')
  //       this.getCategories();
  //     }
  //   })
  // }

  // deleteCategory(categoryId: any) {
  //   this._RecipesService.onDeleteCategory(categoryId).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     }, error: () => {

  //     }, complete: () => {
  //       this._ToastrService.info('Deleted Successfuly')
  //       this.getCategories();
  //     }
  //   })
  // }


  getAllTages(){
    this._HelperService.getTags().subscribe({
      next:(res)=>{
        console.log(res);
        this.tags = res;
      }
    })
  }

  getAllCategories(){ 
    this._CategoryService.getAllCategories(1000,1,'').subscribe({
      next:(res)=>{
        console.log(res);
        this.categories = res.data;
      }
    })
  }
}
