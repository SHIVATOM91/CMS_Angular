import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageService } from '../../../shared/services/page.service';
import { environment } from '../../../../environments/environment';
import { TestimonialsService } from '../../../shared/services/testimonials.service';
import { SeoService } from '../../../shared/services/seo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AboutusComponent implements OnInit {
  img_url=environment.imgUrl;
  aboutus_section_id=138;
  aboutus_section_content : Section;
  pageContent;
  pageId=5;
  aboutSlider;
  constructor(private _section:PageService, private _testimonials:TestimonialsService, private seo:SeoService, private router:Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._section.getBy(this.pageId).subscribe(response=>{
      this.pageContent=response;

      this.seo.generateTags({
        title: this.pageContent.metaTitle,
        description: this.pageContent.metaDescription,
        image: this.pageContent.canonicalUrl,
        slug: this.router.url.split('/')[1]
      })
      this.getPageSection();
    })

  }
  getPageSection(){
    this._section.getOuterPageSections(this.aboutus_section_id).subscribe(response=>{
      this.aboutus_section_content=response as Section;
      this.getAboutSlider();
    })
  }
  getAboutSlider(){
    this._testimonials.getTestimonials().subscribe(response=>{
      this.aboutSlider=response;
    })
  }
}

export class Section{
  title: any;
  properties: any;
}
