import { TeamsService } from './../../../shared/services/teams.service';
import { PartnersService } from './../../../shared/services/partners.service';
import { ServicesService } from './../../../shared/services/services.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { PageService } from '../../../shared/services/page.service';
import { environment } from '../../../../environments/environment';
import { ProjectCategoryService } from '../../../shared/services/project-category.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../shared/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit,  OnDestroy {
  total_project_count=4;
  img_url=environment.imgUrl;
  about_section_id=149;
  about_section_content: Section;

  arbeitsgattungen_section_id=156;
  arbeitsgattungen_section_content: Section;

  //project section
  project_section_id=154;
  project_section_content: Section;
  projectCategorySlider;
  currentProjectId:undefined;
  currentProjectIndex: undefined;
  currentProjectArray=[];

  //services section
  services_section_id=150;
  services_section_content: Section;
  servicesArray: ServiceObject[];

  //partner section
  partner_section_id=151;
  partner_section_content: Section;
  partnerArray: ServiceObject[];

  //team section
  team_section_id=165;
  team_section_content: Section;
  teamArray: ServiceObject[];

  //array of sections
  arraySectObj=[
    {
      key: 'about_section_content',
      id: 149
    },
    {
      key: 'arbeitsgattungen_section_content',
      id: 156
    },
    {
      key: 'project_section_content',
      id: 154
    },
    {
      key: 'services_section_content',
      id: 150
    },
    {
      key: 'partner_section_content',
      id: 151
    },
    {
      key: 'team_section_content',
      id: 165
    }
  ]

  constructor(private _section:PageService, private route:ActivatedRoute, private _projects:ProjectService, private _projectcategory:ProjectCategoryService, private _service: ServicesService, private _partner: PartnersService, private _team: TeamsService) {

   }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._section.getArraySections(this.arraySectObj).subscribe(response=>{
      let arraySect = response as Section[];
      this.about_section_content=arraySect['about_section_content'];
      this.project_section_content=arraySect['project_section_content'];
      this.arbeitsgattungen_section_content=arraySect['arbeitsgattungen_section_content'];
      this.services_section_content=arraySect['services_section_content'];
      this.partner_section_content=arraySect['partner_section_content'];
      this.team_section_content=arraySect['team_section_content'];
    })

    this.getProjectDetails();
    this.getServicesDetails();
    this.getPartnerDetails();
    this.getTeamDetails();
  }

  ngOnDestroy() {
  }

  getProjectDetails(){

    this._projects.getProjects().subscribe(response=>{
      this.projectCategorySlider=response;
      this.projectCategorySlider=this.splitArrayIntoChunks(this.projectCategorySlider,this.total_project_count);
      // if(this.projectCategorySlider.length > 0){
      //   this.toggleProjectMenu(this.projectCategorySlider[0].id, 0);
      // }
    })


  }

  splitArrayIntoChunks(arr, chunkLen){
      var chunkList = []
      var chunkCount = Math.ceil(arr.length/chunkLen)
      for(var i = 0; i < chunkCount; i++){
          chunkList.push(arr.splice(0, chunkLen))
      }
      return chunkList
  }

  getServicesDetails(){

    this._service.get().subscribe(response => {
      this.servicesArray = response as ServiceObject[];

    })
  }

  getPartnerDetails(){

    this._partner.getPartners().subscribe(response=>{
      this.partnerArray=response as ServiceObject[];
    })
  }

  getTeamDetails(){

    this._team.getTeams().subscribe(response=>{
      this.teamArray=response as ServiceObject[];
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
