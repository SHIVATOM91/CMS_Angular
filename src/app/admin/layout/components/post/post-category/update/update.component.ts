import { PostCategoryService } from '../../../../../../shared/services/post-category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public updateForm: FormGroup;
  constructor(private _serviceprivate: PostCategoryService,private fb:FormBuilder) {
    this.updateForm = fb.group({
      id: [''],
      title: ["", Validators.required],
      description: [''],
      image: ['']
    });
  }

  ngOnInit() {
  }

  handleFileInput(event){
    this.updateForm.get('image').setValue(event.target.files);
  }

  uploadData(){
    console.log(this.updateForm.value);
    this._serviceprivate.create(this.updateForm.value).subscribe(response =>{

    })

  }
}
