import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageService } from '../../../../../shared/services/page.service';
import { SectionsService } from '../../../../../shared/services/sections.service';
import { DragulaService } from 'ng2-dragula';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-new-pages',
  templateUrl: './new-pages.component.html',
  styleUrls: ['./new-pages.component.css']
})

export class NewPagesComponent implements OnInit , OnDestroy {
   //modal variable
  image;
  autoPublish=false;
  pageId;
  pageForm:FormGroup;
  ErrorObject = {
    'type': '',
    'show': false,
    'msg':''
  };

  pageSectionList:Array<any> = [];
  selectedSection:Array<any> =[];

  constructor(
    private _page:PageService ,
    private _sectionService:SectionsService ,
    private dragulaService: DragulaService ,
    private route:ActivatedRoute,
    private router:Router,
    private toastr: ToastrService,
    private fb:FormBuilder)
    {
      this.pageId = this.route.snapshot.paramMap.get('pageId');
      this.pageForm=fb.group({
        id:[''],
        title:['',Validators.required],
        description:['',Validators.required],
        sections : fb.array([])
      })
    }

    ngOnInit() {
      if(this.pageId){
        this.getPageData();
      }

      this.dragulaService.setOptions('another-bag', {
        copy: true,
        moves: function (el, container, handle) {
          return container.id !== 'no-drop';
        }
      });

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

    getPageData(){
      this._page.getBy(this.pageId).subscribe(response=>{
        let data=response as PageObj;
        let sectionArray=this.pageForm.get('sections') as FormArray;
        this.pageForm.get('id').setValue(data.id);
        this.pageForm.get('title').setValue(data.title);
        this.pageForm.get('description').setValue(data.description);
        this.selectedSection=data.page_sections as SectionObj[];
        this.updateSectionList();
      });
    }

  handleFileInput(event){
    this.image=event.target.files[0];
  }

  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
    this.updateSectionList();
    this.publishPage();
    this.autoPublish=true;
  }

  updateSectionList(){
    let sections=this.pageForm.get('sections') as FormArray;
    sections.controls=[];
    this.selectedSection.forEach(element => {
      let section_id=element.section_id;
      let id=element.id;
      if(element.section_id == null){
        section_id = element.id;
        id=null;
      }
      sections.push(this.initPageSections(element.title, section_id, id));
    });

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

  editProprty(section){
    //console.log(section)
    this.router.navigate(['admin/dashboard/page/editpage',section.id],{skipLocationChange:true})
  }

  deleteProprty(section){
    let index=this.selectedSection.indexOf(section);
    this._page.deletePageSection(section.id).subscribe(response => {
      this.selectedSection.splice(index, 1);
    })

  }
  publishPage(){

    if(this.pageForm.invalid){
      this.toastr.error('Please check the entered data.');
      return false;
    }
    this._page.create(this._page.createFormData(this.pageForm.value)).subscribe(response=>{
      let page = response.data as PageObj;
      if(this.autoPublish == false){
        this.autoPublish=true;
        this.toastr.success('Page is published Successfully.');
      }
      this.pageId=page.id;
      this.getPageData();
    },
    error=>{
      this.toastr.error('There is some error in creating the page.');
    })
  }
  ngOnDestroy(){
    this.dragulaService.destroy('another-bag');
  }
}

export class SectionObj{
  id: any;
  title: any;
  section_id:any
}

export class PageObj{
  id: any;
  title: any;
  description: any;
  page_sections: any;
}
