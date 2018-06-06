import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../../../services/page.service';

@Component({
  selector: 'app-new-pages',
  templateUrl: './new-pages.component.html',
  styleUrls: ['./new-pages.component.css']
})
export class NewPagesComponent implements OnInit {
   //modal variable
  image
  pageModal={
    "title":"",
    "description":"",
    "bannerimg":"",
  }

  pageProperties=[
    {"type":"section" },
    {"type":"banner"},
    {"type":"contactform"},
  ]

  constructor(private _page:PageService) { }

  ngOnInit() {
      
  }
  handleFileInput(event){
    this.image=event.target.files[0];
  }

  addProperties(Properties){
    if(Properties=='section'){
      this.pageProperties.push( {"type":"section" })
    }
  }

  publishPage(pageForm){
   console.log(pageForm);
    this._page.createPage(pageForm).subscribe(result=>{
      console.log(result)
    })
  }

}
