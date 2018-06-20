import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../../../shared/services/page.service';
import { SectionsService } from '../../../../../shared/services/sections.service';
import { DragulaService } from 'ng2-dragula';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-new-pages',
  templateUrl: './new-pages.component.html',
  styleUrls: ['./new-pages.component.css']
})

export class NewPagesComponent implements OnInit {
   //modal variable
  image;
  pageForm:FormGroup;
  ErrorObject = {
    'type': '', 
    'show': false,
    'msg':''
  };
  
  pageSectionList:Array<any> = [];
  selectedSection:Array<any> =[];

  constructor(private _page:PageService ,  private _sectionService:SectionsService , private dragulaService: DragulaService , private fb:FormBuilder) { 
    this.pageForm=fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      sections : fb.array([])
    })
  }

  ngOnInit() {

    this.dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });

    this.dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });

    this._sectionService.get().subscribe(result=>{
      this.pageSectionList=result as SectionObj[];
    });
  }
  
  handleFileInput(event){
    this.image=event.target.files[0];
  }
  
  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
    console.log(args)
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    // do something else
  }

  initPageSections( title? , section_id?, id?):FormGroup{
    return this.fb.group({
      id: [id],
      section_id:[section_id],
      title: [title,Validators.required]
    });
  }
  
  publishPage(formData){
    let sections=this.pageForm.get('sections') as FormArray;
    sections.setValue([]);
    this.selectedSection.forEach(element => {
      sections.push(this.initPageSections(element.title, element.id));
    });
    console.log(this.pageForm.value);
    
    // this._page.create(formData).subscribe(result=>{
    //   this.ErrorObject.show=true;
    //   if(result.success){
    //     this.ErrorObject.type='success';
    //   }else{
    //     this.ErrorObject.type='fail';
    //     this.ErrorObject.msg =result.toString();
    //   }
    // })
  }
}

export class SectionObj{
  id: any;
  title: any;
}
