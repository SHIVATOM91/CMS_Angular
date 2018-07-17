import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PageService } from '../../../shared/services/page.service';
import { ServicesService } from '../../../shared/services/services.service';
import { Router } from '@angular/router';
import { SeoService } from '../../../shared/services/seo.service';

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
  pageContent;
  pageId=7;
  constructor(private _section:PageService, private _sectionservices:ServicesService,private seo:SeoService, private router:Router) { }

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

    this._section.getBy(this.pageId).subscribe(response=>{
      this.pageContent=response;

           
      this.seo.generateTags({
        title: this.pageContent.metaTitle, 
        description: this.pageContent.metaDescription, 
        image: this.pageContent.canonicalUrl,
        slug: this.router.url.split('/')[1]
      })
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