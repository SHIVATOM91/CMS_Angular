import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PageService } from '../../../shared/services/page.service';
import { ServicesService } from '../../../shared/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  img_url=environment.imgUrl;
  services_section_id=152;
  services_section_content: Section;
  servicesList;
  currentServiceId:undefined;
  constructor(private _section:PageService, private _sectionservices:ServicesService) { }

  ngOnInit() {
    this._section.getOuterPageSections(this.services_section_id).subscribe(response=>{
      this.services_section_content=response as Section;
    })
    this._sectionservices.getServices().subscribe(response=>{
      this.servicesList=response;
    })  
  }

  setServiceContent(id, index)
  {
   
    this.currentServiceId=id;
    this.servicesList;  
    console.log( this.servicesList);
  }

}

export class Section{
  title: any;
  properties: any;
}

