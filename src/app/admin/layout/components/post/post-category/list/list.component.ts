import { PostCategoryService } from './../../../../../../shared/services/post-category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'Image' }
  ];
  categoryList: Array<CategoryObject>;
  constructor(private _service: PostCategoryService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    this._service.get().subscribe(response => {
      this.categoryList = response as CategoryObject[];
    })
  }

}

export class CategoryObject{
  title: any;
  description: any;
  image: any;
}
