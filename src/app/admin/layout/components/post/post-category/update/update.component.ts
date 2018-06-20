import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public updateForm: FormGroup;
  constructor(private fb:FormBuilder) {
    this.updateForm = fb.group({
      title: ["", Validators.required],
      description: [''],
      image: ['']
    });
  }

  ngOnInit() {
  }

  handleFileInput(event){
    this.updateForm.get('image').setValue(event.target.files[0]);
  }

  uploadData(){
    console.log(this.updateForm.value);

  }
}
