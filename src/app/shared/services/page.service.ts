import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../admin/services/auth.service';
import { DataService } from './data.service';



@Injectable()
export class PageService  extends DataService {

  apiUrl:String =environment.apiUrl;

  constructor(http:HttpClient) {
    super(http, 'pages');
  }

  getProperties(){
    return this.http.get(this.apiUrl+"page-property", this.token)
  }

  getPageSections(section_id){
    return this.http.get(this.apiUrl+"page-section/"+section_id, this.token)
  }

  getOuterPageSections(section_id){
    return this.http.get(this.apiUrl+"page-section/outer/"+section_id, this.token)
  }

  getArraySections(arrayObj){
    return this.http.post(this.apiUrl+"page-section/outer/array",{sectionsArray :arrayObj}, this.token)
  }

  updatePageSection(formData){
      return this.http.post(this.apiUrl+"page-section" , formData , this.token );
  }

  deletePageSection(id){
      return this.http.delete(this.apiUrl+"pages/section/"+id , this.token );
  }

  getData(response:any ,  key){
    let value;
    response.forEach(element => {
      if(element.key==key && element.type!="file" && element.type!="link" ) value=element.value;
      else if(element.key==key) value=element.link;
    });
    return value;
  }

}
export interface Page{
  success:boolean,
  img_url,
  title:String
}
