import { BannerTypeService } from './../../../../shared/services/banner-type.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BannerService } from '../../../../shared/services/banner.service';
import { environment } from '../../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  /* type initialization */
  typeForm: FormGroup;
  bannerTypes;
  editTypeIndex=null;
  typeFormState: string =  "new";
  // end of type var

  selectedBannerId="";
  bannerForm: FormGroup;
  image;
  errorMsgShow=false;
  errorMsgType='';
  errorMsgMessage='';
  bannerContent;
  imgUrl= environment.imgUrl;
  page = 4;
  closeResult;
  bannerEditMode=false;
  //modal variable
  bannerModal={
      "title":"",
      "description":"",
      "bannerimg":"",
  }
  constructor(private _bannerServ:BannerService , private _bannerTypeServ: BannerTypeService, private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.getAllBanner();
    this.getAllBannerTypes();
    this.errorMsgShow=false;

    this.typeForm = this.fb.group({
      typeName: ['', [Validators.minLength(2), Validators.required]]
    });

    this.bannerForm=this.fb.group({
      banner_types_id: ['', [Validators.required]],
      title: ['', [Validators.minLength(2), Validators.required]],
      description: [''],
      bannerimg: ['', [Validators.required]]
     })
  }

  handleFileInput(event){
    this.image=event.target.files[0];
  }

  getAllBanner(){
    this._bannerServ.getAllBanner().subscribe(banner=>{
      this.bannerContent=banner;
    })
  }

  addBanner(content){
    this.bannerEditMode=false;
    this.errorMsgShow=false;
    this.bannerModal.title="";
    this.bannerModal.description="";
    this.bannerModal.bannerimg="";
    this.modalService.open(content)
  }

  editBanner(item,content){
    this.bannerEditMode=true;
    this.bannerModal.title=item.title;
    this.bannerModal.description=item.description;

    //this.bannerModal.bannerimg=this.imgUrl+'/'+item.bannerimg;
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
    frmData.append('banner_types_id' ,"1");
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

  updateBanner(bannerForm){
    let frmData=new FormData();
    frmData.append('title' ,bannerForm.controls.title.value);
    frmData.append('description' ,bannerForm.controls.description.value);
    frmData.append('banner_types_id' ,"1");
    frmData.append('bannerimg' ,this.image);
    this._bannerServ.updateBanner(frmData).subscribe(result=>{
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

  test(){
    console.log(this.bannerForm.value);
  }



  //Banner Type Section
  getAllBannerTypes(){
    this._bannerTypeServ.get().subscribe(response=>{
      this.bannerTypes=response;
    })
  }

  addBannerTypes(){
    if(!(this.typeForm.invalid) && this.editTypeIndex == null){
      this._bannerTypeServ.create(this.typeForm.value).subscribe(response=>{
        if(response.success){
          this.bannerTypes.push(response.data);
          this.typeForm.reset();
        }
      },error=>{

      })
    }
  }

  editBannerType(index){
    this.typeFormState = "edit";
    this.editTypeIndex = index;
    this.typeForm.setValue({
      typeName: this.bannerTypes[index].typeName
    });
  }

  updateBannerTypes(){
    if(!(this.typeForm.invalid)){
      this._bannerTypeServ.update(this.bannerTypes[this.editTypeIndex].id, this.typeForm.value).subscribe(response=>{
        if(response.success){
          this.bannerTypes[this.editTypeIndex]=response.data;
          this.typeForm.reset();
          this.editTypeIndex=null;
          this.typeFormState="new";
        }
      },error=>{
        console.log(error);

      })
    }
  }

  deleteBannerTypes(index){

    if(!(confirm("Do you really want to delete? This may contain banners."))){
      return false;
    }
    this._bannerTypeServ.delete(this.bannerTypes[index].id).subscribe(response=>{
      this.bannerTypes.splice(index,1)
      this.getAllBanner();
    })
  }
  //end of banner type section
}
