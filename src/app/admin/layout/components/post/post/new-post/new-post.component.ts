import { environment } from './../../../../../../../environments/environment';
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
  localImage;
  imgUrl= environment.imgUrl;
  constructor(private _service: PostService, private _cat_service: PostCategoryService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute,private toastr: ToastrService) {
    this.postForm = fb.group({
      id: [1],
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

  publishPost(){
    this._service.create(this._service.createFormData(this.postForm.value)).subscribe(response=>{
      console.log(response);
    })
  }

  handleFileInput(event){

    this.postForm.get('image').setValue(event.target.files[0]);
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.localImage=myReader.result;
    }
    myReader.readAsDataURL(event.target.files[0]);

  }

}

export class CategoryObject{
  id: any;
  title: any;
}
