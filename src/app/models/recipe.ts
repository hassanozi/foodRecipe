export interface IRecipe{
    name:string;
    description:string;
    price:number;
    tagId:number;
    recipeImage:string;
    categoriesIds:number[];
    category?:number[];
    tag?:number[];
}