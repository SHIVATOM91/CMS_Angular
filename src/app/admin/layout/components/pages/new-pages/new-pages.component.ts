import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../../../shared/services/page.service';



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

  ErrorObject = {
    'type': '', 
    'show': false,
    'msg':''
  };
  pageProperties=[
    {"type":"section" },
    {"type":"banner"},
    {"type":"contactform"},
  ]

  
  constructor(private _page:PageService) { 
    _page.getProperties().subscribe(result=>{
      console.log(result)
    })
  }

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
  
    this._page.createPage(pageForm).subscribe(result=>{
      this.ErrorObject.show=true;
      console.log(result)
      if(result.success){
        
        this.ErrorObject.type='success';
        console.log(this.ErrorObject.show)
      }else{
        this.ErrorObject.type='fail';
        this.ErrorObject.msg =result.title.toString();
      }
    })
  }

}
