import { category } from './../../post-category/update/update.component';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { PostService } from './../../../../../../shared/services/post.service';
import { Component, OnInit } from '@angular/core';
import { PostCategoryService } from '../../../../../../shared/services/post-category.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  categoryList: Array<CategoryObject>;
  postForm: FormGroup;
  constructor(private _service: PostService, private _cat_service: PostCategoryService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute,private toastr: ToastrService) {
    this.postForm = fb.group({
      id: [],
      title: ['', Validators.required],
      description: [],
      image: [],
      categories: fb.array([])
    })
  }


  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    this._cat_service.get().subscribe(response => {
      this.categoryList = response as CategoryObject[];

      this.categoryList.forEach(cat => {
        this.categories.push(this.initCategoryBox(cat.id, cat.title));
      })
      console.log(this.categories);

    })
  }

  get categories(){
    return this.postForm.get('categories') as FormArray;
  }

  initCategoryBox(id?, name?){
    let choice=false;

    return this.fb.group({
      id: [id],
      title: [name],
      selected: [choice]
    })
  }

}

export class CategoryObject{
  id: any;
  title: any;
}
