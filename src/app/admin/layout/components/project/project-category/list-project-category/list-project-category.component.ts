import { ProjectCategoryService } from './../../../../../../shared/services/project-category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-project-category',
  templateUrl: './list-project-category.component.html',
  styleUrls: ['./list-project-category.component.css']
})
export class ListProjectCategoryComponent implements OnInit {
  editing = {};
  selected = [];
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'Image' }
  ];
  categoryList: Array<CategoryObject>;
  constructor(private _service: ProjectCategoryService, private router: Router) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    this._service.get().subscribe(response => {
      this.categoryList = response as CategoryObject[];

    })
  }

  onRowSelect(){
    if(this.selected.length > 0)
      this.router.navigate(['admin/project/category/update', this.selected[0].id] , { skipLocationChange:true})
  }

}

export class CategoryObject{
  title: any;
  description: any;
  image: any;
}
