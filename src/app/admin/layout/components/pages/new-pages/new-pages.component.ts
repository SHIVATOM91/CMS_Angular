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

  pagePropertiesList;
  pagePropertiesData:any[][]=[];
  
  constructor(private _page:PageService) { 
    _page.getProperties().subscribe(result=>{
      this.pagePropertiesList=result;
    })
  }

  ngOnInit() {}

  handleFileInput(event){
    this.image=event.target.files[0];
  }

  addProperties(Properties){
    
    this.pagePropertiesData[0]=[];
    this.pagePropertiesData[0]['propertyId']=Properties;
    this.pagePropertiesData[0]['propertyValue']="asd sadasd asdsd ";
    
    console.log(this.pagePropertiesData);
    console.log('-------------------');
    //Properties.push({"properties":this.pagePropertiesData})
    console.log(Properties);
    if(Properties=='section'){
      this.pagePropertiesList.push( {"type":"section" })
    }
  }

  publishPage(pageForm){
    console.log(pageForm)
    pageForm.push({"Properties":this.pagePropertiesData})
    console.log(pageForm)
    this._page.create(pageForm).subscribe(result=>{
      this.ErrorObject.show=true;
      if(result.success){
        this.ErrorObject.type='success';
      }else{
        this.ErrorObject.type='fail';
        this.ErrorObject.msg =result.toString();
      }
    })
  }
}
