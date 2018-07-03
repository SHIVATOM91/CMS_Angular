import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageService } from '../../../shared/services/page.service';
import { environment } from '../../../../environments/environment';
import { TestimonialsService } from '../../../shared/services/testimonials.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AboutusComponent implements OnInit {
  img_url=environment.imgUrl;
  aboutus_section_id=138;
  aboutus_section_content;
  aboutSlider;
  constructor(private _section:PageService, private _testimonials:TestimonialsService) { }

  ngOnInit() {
    this._section.getPageSections(this.aboutus_section_id).subscribe(response=>{
      console.log(response)
      this.aboutus_section_content=response;
    })
    this._testimonials.getTestimonials().subscribe(response=>{
      console.log(response
      )
      this.aboutSlider=response;
    })
  }
  content(value){
    return this._section.getData(this.aboutus_section_content.page_section_props , value)
  }
}