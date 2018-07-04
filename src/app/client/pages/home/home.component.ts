import { ServicesService } from './../../../shared/services/services.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageService } from '../../../shared/services/page.service';
import { environment } from '../../../../environments/environment';
import { ProjectCategoryService } from '../../../shared/services/project-category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  img_url=environment.imgUrl;
  about_section_id=149;
  about_section_content: Section;

  //project section
  project_section_id=142;
  project_section_content: Section;
  projectCategorySlider;
  currentProjectId:undefined;
  currentProjectIndex: undefined;
  currentProjectArray=[];

  //services section
  services_section_id=150;
  services_section_content: Section;
  servicesArray: ServiceObject[];

  constructor(private _section:PageService, private _projectcategory:ProjectCategoryService, private _service: ServicesService) { }

  ngOnInit() {
    this.getAboutSection();
    this.getProjectDetails();
    this.getServicesDetails();

  }

  getAboutSection(){
    this._section.getOuterPageSections(this.about_section_id).subscribe(response=>{
      this.about_section_content=response as Section;
    })
  }

  getProjectDetails(){
    this._section.getOuterPageSections(this.project_section_id).subscribe(response=>{
      this.project_section_content=response as Section;
    })

    this._projectcategory.getProjectcategories().subscribe(response=>{
      this.projectCategorySlider=response;
      if(this.projectCategorySlider.length > 0){
        this.toggleProjectMenu(this.projectCategorySlider[0].id, 0);
      }
    })
  }

  getServicesDetails(){

    this._section.getOuterPageSections(this.services_section_id).subscribe(response=>{
      this.services_section_content=response as Section;
    })


    this._service.get().subscribe(response => {
      this.servicesArray = response as ServiceObject[];
      this.servicesArray = this.servicesArray.splice(0,4);

    })
  }

  toggleProjectMenu(id, index){
    this.currentProjectId=id;
    this.currentProjectArray=this.projectCategorySlider[index].projects;
  }

}


export class Section{
  title: any;
  properties: any;
}

export class ServiceObject{
  title: any;
  shortDescription: any;
  featuredImage: any;
}
