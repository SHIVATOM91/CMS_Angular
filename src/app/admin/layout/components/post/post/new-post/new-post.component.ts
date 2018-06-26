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
  postId;
  categoryList: Array<CategoryObject>=[];
  postForm: FormGroup;
  currentObj;
  presentArray=[];
  localImage;
  imgUrl= environment.imgUrl;
  constructor(private _service: PostService, private _cat_service: PostCategoryService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute,private toastr: ToastrService) {
    this.postId = this.route.snapshot.paramMap.get('postId');
    if(this.postId != null)
      this.getPostData();
    this.postForm = fb.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      image: [''],
      categories: fb.array([])
    })
  }


  ngOnInit() {
    this.getAllCategories();
  }

  getPostData(){
    this._service.getBy(this.postId).subscribe( response => {
      this.currentObj = response as PostObject;
      console.log(this.currentObj);

      this.postForm.get('id').setValue(this.currentObj.id);
      this.postForm.get('title').setValue(this.currentObj.title);
      this.postForm.get('description').setValue(this.currentObj.description);
      this.postForm.get('image').setValue(this.currentObj.image);
      for(let i=0;i<this.currentObj.post_categories.length; i++){
        this.presentArray.push(this.currentObj.post_categories[i].id);
      }
      this.initializeCategory();
    })
  }



  getAllCategories(){
    this._cat_service.get().subscribe(response => {
      this.categoryList = response as CategoryObject[];
      this.initializeCategory();
    })
  }

  initializeCategory(){
    this.categoryList.forEach(cat => {
      this.categories.push(this.initCategoryBox(cat.id, cat.title));
    })

  }

  get categories(){
    return this.postForm.get('categories') as FormArray;
  }

  initCategoryBox(id?, name?){
    let choice=false;
    if(this.presentArray.indexOf(id) >= 0 && id!=''){
      choice=true;
    }
    return this.fb.group({
      id: [id],
      title: [name],
      selected: [choice]
    })
  }

  publishPost(){
    this._cat_service.validateAllFormFields(this.postForm);
    this._service.create(this._service.createFormData(this.postForm.value)).subscribe(response=>{
      console.log(response);
      this.toastr.success('Post is published Successfully.'); 
    },
    error=>{
      this.toastr.error('There is some error in creating the Post.'); 
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
export class PostObject{
  id: any;
  title: any;
  description: any;
  image: any;
  categories: any;
}
