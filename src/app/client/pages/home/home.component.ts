import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../shared/services/page.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  img_url=environment.imgUrl;
  about_section_id=136;
  about_section_content;
  constructor(private _section:PageService) { }

  ngOnInit() {
    this._section.getPageSections(this.about_section_id).subscribe(response=>{
      console.log(response)
      this.about_section_content=response;
    })
  }

  content(value){
    return this._section.getData(this.about_section_content.page_section_props , value)
  }


}
