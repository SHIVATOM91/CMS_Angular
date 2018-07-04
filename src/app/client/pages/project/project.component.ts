import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PageService } from '../../../shared/services/page.service';
import { ProjectCategoryService } from '../../../shared/services/project-category.service';
import { ProjectService } from '../../../shared/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
  img_url=environment.imgUrl;
  project_section_id=139;
  project_section_content: Section;
  categoryList;
  projectList;
  activeIndex=0;
  constructor(private _section:PageService, private _postcategory:ProjectCategoryService, private _projectservice:ProjectService) { }

  ngOnInit() {
    this._section.getOuterPageSections(this.project_section_id).subscribe(response=>{
      this.project_section_content=response as Section;
    })
    
    this._postcategory.getProjectcategories().subscribe(response=>{
      this.categoryList=response
      console.log(response)
    }) 
    
    this._projectservice.getProjects().subscribe(response=>{
      this. projectList=response
      console.log(response)
    }) 
  }


  setProjectContent(i)
  {
   console.log( this.activeIndex);
    return this.activeIndex=i;
   
    // this.projectList.array.forEach((i) => {
    //   i.active=false;
    // })
  }
 /* content(value){
    return this._section.getData(this.project_section_content.page_section_props , value)
  } */

}

export class Section{
  title: any;
  properties: any;
}