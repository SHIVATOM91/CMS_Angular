import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../shared/services/page.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  img_url=environment.imgUrl;
  aboutus_section_id=138;
  aboutus_section_content;
  constructor(private _section:PageService) { }

  ngOnInit() {
    this._section.getPageSections(this.aboutus_section_id).subscribe(response=>{
      console.log(response)
      this.aboutus_section_content=response;
    })
  }
  content(value){
    return this._section.getData(this.aboutus_section_content.page_section_props , value)
  }
}