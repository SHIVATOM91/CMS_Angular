import { Router, ActivatedRoute } from '@angular/router';
import { ProjectCategoryService } from '../../../../../../shared/services/project-category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-project-category',
  templateUrl: './update-project-category.component.html',
  styleUrls: ['./update-project-category.component.css']
})
export class UpdateProjectCategoryComponent implements OnInit {
  public updateForm: FormGroup;
  public formData: FormData;
  catId;
  constructor(private _serviceprivate: ProjectCategoryService,private fb:FormBuilder, private router:Router, private route:ActivatedRoute,private toastr: ToastrService) {
    this.catId = this.route.snapshot.paramMap.get('catId');
    if(this.catId != null)
      this.getCategoryData();
    this.updateForm = fb.group({
      id: [''],
      title: ["", Validators.required],
      description: [''],
      image: ['']
    });
  }

  ngOnInit() {

  }

  getCategoryData(){
    this._serviceprivate.getBy(this.catId).subscribe( response => {
      let obj = response as category;
      this.updateForm.get('id').setValue(obj.id);
      this.updateForm.get('title').setValue(obj.title);
      this.updateForm.get('description').setValue(obj.description);
    })
  }

  handleFileInput(event){
    this.updateForm.get('image').setValue(event.target.files[0]);
  }

  uploadData(){
    this._serviceprivate.validateAllFormFields(this.updateForm);
    if(this.updateForm.valid){
      this._serviceprivate.create(this._serviceprivate.createFormData(this.updateForm.value)).subscribe(response =>{

        this.toastr.success('Category Published Successfully.');
      },
        error=>{
          this.toastr.error('There is some error in creating the Category');
      })
    }
  }
}

export class category{
  id: any;
  title: any;
  description: any;
}
