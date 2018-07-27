import { environment } from './../../../../../environments/environment';
import { SettingService } from './../../../../shared/services/setting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SettingComponent implements OnInit {
  img_url= environment.imgUrl;
  settingForm: FormGroup;
  currentMenu='general';
  localImage: undefined;

  constructor(private fb:FormBuilder, private _service: SettingService, private toastr: ToastrService) {
    this.settingForm = fb.group({
      id: [''],
      companyName: [''],
      description: [''],
      primaryPhone: ['',[Validators.required, Validators.pattern(/^[+]?[0-9 ]{10,}$/)]],
      secondaryPhone: ['',[Validators.pattern(/^[+]?[0-9 ]{10,}$/)]],
      primaryEmail: ['',[Validators.required, CustomValidators.email]],
      secondaryEmail: ['',[Validators.required, CustomValidators.email]],
      primaryAddress: [''],
      secondaryAddress: [''],
      facebookLink: [''],
      twitterLink: [''],
      instaLink: [''],
      googleLink: [''],
      whatsAppLink: [''],
      youtubeLink: [''],
      footerMessage: [''],
      embedMap: [''],
      longitude: [''],
      latitude: [''],
      logo: [null],
      created_at: [''],
      updated_at: [''],
    })
  }

  ngOnInit() {
    this.getSettingData();
  }

  handleFileInput(event){

    this.settingForm.get('logo').setValue(event.target.files[0]);
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.localImage=myReader.result;
    }
    myReader.readAsDataURL(event.target.files[0]);
  }

  getSettingData(){
    this._service.get().subscribe( response => {
      this.settingForm.setValue(response as SettingObj);

    })
  }

  updateSettingData(){
    this._service.validateAllFormFields(this.settingForm);
    this._service.create(this._service.createFormData(this.settingForm.value)).subscribe(response => {
      this.toastr.success('Settings Updated Successfully.');
    })
  }
}

export class SettingObj{
  companyName: any;
  description: any;
  primaryPhone: any;
  secondaryPhone: any;
  primaryEmail: any;
  secondaryEmail: any;
  primaryAddress: any;
  secondaryAddress: any;
  facebookLink: any;
  twitterLink: any;
  instaLink: any;
  googleLink: any;
  whatsAppLink: any;
  youtubeLink: any;
  footerMessage: any;
  embedMap: any;
  longitude: any;
  latitude: any;
  logo: any;
}
