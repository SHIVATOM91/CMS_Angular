import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PageService } from '../../../shared/services/page.service';
import { ContactService } from '../../../shared/services/contact.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingService } from '../../../shared/services/setting.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  img_url=environment.imgUrl;
  contactus_section_id=153;
  contactus_section_content : Section;
  contactFrom:any;
  type;
  errorMsg=undefined;
  loading=false;
  form:FormGroup;
  settingData: SettingObj;
  pageContent;
  pageId=8;
  constructor(private _section:PageService, private _contactfrmsection:ContactService,private fb: FormBuilder, private _setting: SettingService) {
    this.form = this.fb.group({
      firstName: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      contact: ['', [Validators.required]],
      message: ['']
    });
   }

  ngOnInit() {
    this._section.getOuterPageSections(this.contactus_section_id).subscribe(response=>{
      this.contactus_section_content=response as Section;
      console.log(this.contactus_section_content);
 
    })   
       this.getSettingData();

       this._section.getBy(this.pageId).subscribe(response=>{
        this.pageContent=response;
        console.log(this.pageContent);
        })   
  }

  sendMail()
  {
    if(this.form.valid){
      this.loading=true;
      this._contactfrmsection.create(this._contactfrmsection.createFormData(this.form.value)).subscribe(response=>{
          this.errorMsg=false;
          this.loading=false;
          this.form.reset();
        }, response =>{
          this.errorMsg=true;
          this.loading=false;
        })
      } 
  }

  getSettingData(){
    this._setting.get().subscribe( response => {
      this.settingData=response as SettingObj;
      console.log(response);
    })
  }
}

export class Section{
  title: any;
  properties: any;
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

