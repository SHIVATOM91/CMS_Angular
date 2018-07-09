import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PageService } from '../../../shared/services/page.service';
import { ServicesService } from '../../../shared/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ServicesComponent implements OnInit {
  img_url=environment.imgUrl;
  services_section_id=152;
  services_section_content: Section;
  servicesList;
  currentService:undefined;

  constructor(private _section:PageService, private _sectionservices:ServicesService) { }

  ngOnInit() {
    this._section.getOuterPageSections(this.services_section_id).subscribe(response=>{
      this.services_section_content=response as Section;
    })
    this._sectionservices.getServices().subscribe(response=>{
      this.servicesList=response;
      if(this.servicesList.length > 0){
        this.currentService = this.servicesList[0];
      }
    })  
  }

  setServiceContent(service)
  {
    this.currentService= service;
    console.log(service);
  }
}

export class Section{
  title: any;
  properties: any;
}

