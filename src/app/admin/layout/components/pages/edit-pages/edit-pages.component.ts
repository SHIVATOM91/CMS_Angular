import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../../../shared/services/page.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-pages',
  templateUrl: './edit-pages.component.html',
  styleUrls: ['./edit-pages.component.css']
})
export class EditPagesComponent implements OnInit {
  
  section_id;
  section_details:any=[];
  property_array;
  constructor(private _page:PageService , private route:ActivatedRoute ) { 
    this.section_id= this.route.snapshot.paramMap.get('sectionId');
   
  }

  ngOnInit() {
    this._page.getPageSections(this.section_id).subscribe(response=>{
      this.section_details=response;
      console.log(this.section_details)
    })
  }
}
