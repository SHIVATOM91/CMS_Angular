import { Router, ActivatedRoute } from '@angular/router';
import { PostCategoryService } from '../../../../../../shared/services/post-category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public updateForm: FormGroup;
  public formData: FormData;
  catId;
  constructor(private _serviceprivate: PostCategoryService,private fb:FormBuilder, private router:Router, private route:ActivatedRoute,private toastr: ToastrService) {
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
    this._serviceprivate.create(this._serviceprivate.createFormData(this.updateForm.value)).subscribe(response =>{

      this.toastr.success('Hello world!', 'Toastr fun!');
    })
  }
}

export class category{
  id: any;
  title: any;
  description: any;
}
