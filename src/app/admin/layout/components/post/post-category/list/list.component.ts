import { PostCategoryService } from './../../../../../../shared/services/post-category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  editing = {};
  selected = [];
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'Image' }
  ];
  categoryList: Array<CategoryObject>;
  constructor(private _service: PostCategoryService, private router: Router) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    this._service.get().subscribe(response => {
      this.categoryList = response as CategoryObject[];
      console.log(this.categoryList);

    })
  }

  onRowSelect(){
    this.router.navigate(['admin/dashboard/post/category/update'] , { queryParams: { catId: this.selected[0].id } ,skipLocationChange:true})
  }

}

export class CategoryObject{
  title: any;
  description: any;
  image: any;
}
