import { environment } from './../../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProjectService } from './../../../../../../shared/services/project.service';
import { Component, OnInit } from '@angular/core';
import { ProjectCategoryService } from '../../../../../../shared/services/project-category.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  projectId;
  categoryList: Array<CategoryObject>=[];
  projectForm: FormGroup;
  currentObj;
  presentArray=[];
  localImage;
  imgUrl= environment.imgUrl;
  constructor(private _service: ProjectService, private _cat_service: ProjectCategoryService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute,private toastr: ToastrService) {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    if(this.projectId != null)
      this.getProjectData();
    this.projectForm = fb.group({
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

  getProjectData(){
    this._service.getBy(this.projectId).subscribe( response => {
      this.currentObj = response as ProjectObject;
      console.log(this.currentObj);

      this.projectForm.get('id').setValue(this.currentObj.id);
      this.projectForm.get('title').setValue(this.currentObj.title);
      this.projectForm.get('description').setValue(this.currentObj.description);
      this.projectForm.get('image').setValue(this.currentObj.image);
      for(let i=0;i<this.currentObj.project_categories.length; i++){
        this.presentArray.push(this.currentObj.project_categories[i].id);
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
    return this.projectForm.get('categories') as FormArray;
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

  publishProject(){
    this._cat_service.validateAllFormFields(this.projectForm);
    this._service.create(this._service.createFormData(this.projectForm.value)).subscribe(response=>{
      console.log(response);
      this.toastr.success('Project is published Successfully.');
    },
    error=>{
      this.toastr.error('There is some error in creating the Project.');
    })
  }

  handleFileInput(event){

    this.projectForm.get('image').setValue(event.target.files[0]);
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
export class ProjectObject{
  id: any;
  title: any;
  description: any;
  image: any;
  categories: any;
}
