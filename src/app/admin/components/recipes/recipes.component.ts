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
  tagId:number=0;
  categories:ICategory[]=[];
  categoryId : number = 0;
  tableResponse: any;
  searchkey: string = '';
  imagePath : string = 'https://upskilling-egypt.com/';
  dummyImage :string = '../../../../assets/images/Recipes-Title.png';
  
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
      name:this.searchkey,
      tagId : this.tagId > 0 ? this.tagId : null,
      categoryId : this.categoryId > 0 ? this.categoryId : null
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

  
  openDeleteRecipeDialog(recipeData: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      // data: {name: this.name, animal: this.animal},
      data: recipeData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.onDeleteRecipe(result);
      }
    });
  }

  

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

  onDeleteRecipe(recipeId:any){
    this._RecipesService.onDeleteRecipe(recipeId).subscribe({
      next:(res)=>{
        console.log(res);
      },error:()=>{

      },complete:()=>{
        this._ToastrService.info('Deleted Successfuly')
        this.getRecipes();
      }
    })
  }
}
