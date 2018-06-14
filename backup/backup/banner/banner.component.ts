import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { BannerService } from '../../../../shared/services/banner.service';
import { environment } from '../../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent  {
  widgetsForm

  constructor(private fb:FormBuilder) {
    this.widgetsForm = fb.group({
      newField : this.fb.array([])
    })
  }

  addNewField(){
      this.widgets.push(this.fb.group(new ObjectField()));
  }

  get widgets(){
    return this.widgetsForm.get('newField') as FormArray;
  }
  
}

export class ObjectField{
  street = '';
  city   = '';
  state  = '';
  zip    = '';
}
