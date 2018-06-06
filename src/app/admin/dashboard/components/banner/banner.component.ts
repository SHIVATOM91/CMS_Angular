import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataModalService } from '../../../shared/data-modal.service';
import { BannerService } from '../../../../services/banner.service';
import { environment } from '../../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  bannerForm:any;
  image;
  errorMsgShow=false;
  errorMsgType='';
  errorMsgMessage='';
  bannerContent;
  imgUrl= environment.imgUrl;
  page = 4;
  closeResult;

  //modal variable
  bannerModal={
      "title":"",
      "description":"",
      "bannerimg":"",
  }
  constructor(private _bannerServ:BannerService , private modalService: NgbModal) { 
   // _bannerServ.getAllBanner().subscribe(banner=>{
    //  this.bannerContent=banner;
   // })

   this.bannerContent=[
     { "title":"banner 1" , "description":"banner 1 description" ,"bannerimg":""},
     { "title":"banner 2" , "description":"banner 2 description" ,"bannerimg":""},
     { "title":"banner 3" , "description":"banner 3 description" ,"bannerimg":""},
     { "title":"banner 4" , "description":"banner 4 description" ,"bannerimg":""},
     { "title":"banner 5" , "description":"banner 5 description" ,"bannerimg":""}
   ]
  }

  ngOnInit() {
    this.errorMsgShow=true;
    this.bannerForm=new FormGroup({
      title:new FormControl(Validators.required),
      description:new FormControl(Validators.required)
     }) 
  }
  
  handleFileInput(event){
    this.image=event.target.files[0];
  }

  addBanner(content){
    this.bannerModal.title="";
    this.bannerModal.description="";
    this.bannerModal.bannerimg="";
    this.modalService.open(content)
  }

  editBanner(item,content){
    this.bannerModal.title=item.title;
    this.bannerModal.description=item.description;
    this.bannerModal.bannerimg=item.bannerimg;
    this.modalService.open(content)
  }

  deleteBanner(item){
    let success=confirm("Are you sure want to delete this item");
    if(success){
      this.bannerContent.splice(item,1)
    }
  }

  uploadBanner(bannerForm)
  {
    let frmData=new FormData();
    frmData.append('title' ,bannerForm.controls.title.value);
    frmData.append('description' ,bannerForm.controls.description.value);
    frmData.append('bannerimg' ,this.image);
    this._bannerServ.postBanner(frmData).subscribe(result=>{
      this.errorMsgShow=true;
      if(result.success){
          this.errorMsgType="success";
          this.bannerContent.push({"title":bannerForm.controls.title.value , "description":bannerForm.controls.description.value , "bannerimg":result.img_url})
      }
      else{
        this.errorMsgMessage="fail";
      }
    })
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}