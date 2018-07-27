import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PageService } from '../../../shared/services/page.service';
import { ProjectCategoryService } from '../../../shared/services/project-category.service';
import { ProjectService } from '../../../shared/services/project.service';
import { SeoService } from '../../../shared/services/seo.service';
import { Router } from '@angular/router';

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
  projectList=undefined;
  currentProjectId:undefined;
  pageContent;
  pageId=10;
  constructor(private _section:PageService, private _postcategory:ProjectCategoryService, private _projectservice:ProjectService, private seo:SeoService, private router:Router) { }

  ngOnInit() {
      window.scrollTo(0, 0);



    this._section.getBy(this.pageId).subscribe(response=>{
      this.pageContent=response;
      this.getSectionDetails();
      this.seo.generateTags({
        title: this.pageContent.metaTitle,
        description: this.pageContent.metaDescription,
        image: this.pageContent.canonicalUrl,
        slug: this.router.url.split('/')[1]
      })
      })
  }

  getProjects(){
    this._postcategory.getProjectcategories().subscribe(response=>{
      this.categoryList=response;
      this.setProjectContent(this.categoryList[0].id, 0)
    })
  }

  getSectionDetails(){
    this._section.getOuterPageSections(this.project_section_id).subscribe(response=>{
      this.project_section_content=response as Section;
      this.getProjects();
    })
  }


  setProjectContent(id, index)
  {
    this.currentProjectId=id;
    this.projectList=this.categoryList[index].projects;
  }

}

export class Section{
  title: any;
  properties: any;
}
