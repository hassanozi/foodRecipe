import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/admin/services/category.service';
import { HelperService } from 'src/app/admin/services/helper.service';
import { RecipesService } from 'src/app/admin/services/recipes.service';
import { ICategory } from 'src/app/models/category';
import { IRecipe } from 'src/app/models/recipe';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent implements OnInit {

  constructor(private _RecipesService: RecipesService, private dialog: MatDialog, private router: Router, private _ActivatedRoute: ActivatedRoute,
    private _CategoryService: CategoryService, private _ToastrService: ToastrService, private _HelperService: HelperService) {
    this.recipeId = _ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getAllTages();
    this.getAllCategories();
    if (this.recipeId) {
      this.getRecipeById(this.recipeId);
    }
  }

  tags: any[] = [];
  tagId: number = 0;
  categories: ICategory[] = [];
  categoryId: number = 0;
  imgSrc: any;
  recipeId: number = 0;
  files: File[] = [];
  recipeData: IRecipe | any;
  ids: number[] = [];

  recipeForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    recipeImage: new FormControl(null),
    categoriesIds: new FormControl(null),
  })


  getAllTages() {
    this._HelperService.getTags().subscribe({
      next: (res) => {
        console.log(res);
        this.tags = res;
      }
    })
  }

  getAllCategories() {
    this._CategoryService.getAllCategories(1000, 1, '').subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.data;
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

  onSubmit(data: FormGroup) {
    console.log(data.value);
    data.value.id = this.recipeId;
    let MyData = new FormData();
    MyData.append('name', data.value.name);
    MyData.append('description', data.value.description);
    MyData.append('price', data.value.price);
    MyData.append('tagId', data.value.tagId);
    MyData.append('categoriesIds', data.value.categoriesIds);
    MyData.append('recipeImage', data.value.imgSrc);

    if (this.recipeId) {
      MyData.append('id',data.value.id);
        this.editRecipe(MyData);
    } else {
      this.addRecipe(MyData);
    }


  }

  addRecipe(data:any){
    this._RecipesService.onAddRecipe(data).subscribe({
      next: (res) => {
        console.log(res)
      }, error: () => {

      }, complete: () => {
        this._ToastrService.success('Added Successfully');
        this.router.navigate(['/dashboard/admin/recipes'])
      }
    })
  }

  editRecipe(data:any){
    this._RecipesService.onEditRecipe(this.recipeId,data).subscribe({
      next: (res) => {
        console.log(res)
      }, error: () => {

      }, complete: () => {
        this._ToastrService.success('Edit Successfully');
        this.router.navigate(['/dashboard/admin/recipes'])
      }
    })
  }

  getRecipeById(id: number) {
    this._RecipesService.getRecipeById(id).subscribe({
      next: (res: IRecipe) => {
        console.log(res);
        this.recipeData = res;
      }, error: () => {

      }, complete: () => {

        let arr: any[] = [...this.recipeData.category];
        this.ids = arr.map(x => x.id);
        this.imgSrc='https:upskilling-egypt.com/'+ this.recipeData.imagePath,

        this.recipeForm.patchValue({
          name: this.recipeData.name,
          description: this.recipeData.description,
          price: this.recipeData.price,
          tagId: this.recipeData.tag.id,
          recipeImage: this.imgSrc, 
          categoriesIds: this.recipeData.category.map((x:any)=>x.id),
        })
      }
    })
  }
}
