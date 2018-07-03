import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PageService } from '../../../shared/services/page.service';
import { ProjectCategoryService } from '../../../shared/services/project-category.service';
import { ProjectService } from '../../../shared/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  img_url=environment.imgUrl;
  project_section_id=139;
  project_section_content;
  categoryList;
  constructor(private _section:PageService, private _postcategory:ProjectCategoryService, private _projectservice:ProjectService) { }

  ngOnInit() {
    this._section.getPageSections(this.project_section_id).subscribe(response=>{
      console.log(response)
      this.project_section_content=response;
    })
    
    this._postcategory.getProjectcategories().subscribe(response=>{
      console.log(response)
      this.categoryList=response
    })  
  }

  content(value){
    return this._section.getData(this.project_section_content.page_section_props , value)
  }
}