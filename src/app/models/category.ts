export interface table {
    pageNumber:number;
    pageSize:number;
    totalNumberOfPages:number;
    totalNumberOfRecordes:number;
    date:ICategory[];
}

export interface ICategory{
    id:number;
    name:string;
    creationDate:string;
    modificationDate:string;
}