import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../shared/services/page.service';
import { environment } from '../../../../environments/environment';
import { ProjectCategoryService } from '../../../shared/services/project-category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  img_url=environment.imgUrl;
  about_section_id=149;
  about_section_content: Section;
  project_section_id=142;
  project_section_content: Section;
  projectCategorySlider;
  constructor(private _section:PageService, private _projectcategory:ProjectCategoryService) { }

  ngOnInit() {
    this._section.getPageSections(this.about_section_id).subscribe(response=>{
      this.about_section_content=response as Section;
    })

    this._section.getPageSections(this.project_section_id).subscribe(response=>{
      this.project_section_content=response as Section;
    })

    this._projectcategory.getProjectcategories().subscribe(response=>{
      this.projectCategorySlider=response;
    })
  }

}


export class Section{
  title: any;
  properties: any;
}
