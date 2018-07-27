import { BannerTypeService } from './../../../../shared/services/banner-type.service';
import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BannerService } from '../../../../shared/services/banner.service';
import { environment } from '../../../../../environments/environment';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { ImagePopupComponent } from '../../../../shared/components/image-popup/image-popup.component';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class BannerComponent implements OnInit {
  activeModal: any;
  /* type initialization */
  typeForm: FormGroup;
  bannerForm: FormGroup;
  typeFormState: string =  "new";
  bannerContent;
  bannerFlag=false;
  temp;
  bannerTypes;
  editTypeIndex=null;

  // end of type var
  selectedBannerId="";
  image;
  errorMsgShow=false;
  errorMsgType='';
  errorMsgMessage='';
  imgUrl= environment.imgUrl;
  page = 4;
  closeResult;
  modalReference;
  bannerEditMode=false;
  //modal variable
  bannerModal={
      "title":"",
      "description":"",
      "bannerimg":"",
  }
  constructor(private _bannerServ:BannerService , private _bannerTypeServ: BannerTypeService, private modalService: NgbModal, private fb: FormBuilder,private toastr: ToastrService,) {}

  ngOnInit() {
    // this.bannerForm= [];
    this.getAllBanner();
    this.getAllBannerTypes();
    this.errorMsgShow=false;

    this.typeForm = this.fb.group({
      typeName: ['', [Validators.minLength(2), Validators.required]]
    });

    this.bannerForm=this.fb.group({
      id: [''],
      banner_types_id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      bannerimg: ['', Validators.required]
    })
  }

  handleFileInput(event){
    this.bannerForm.get('bannerimg').setValue(event.target.files[0]);
  }

  getAllBanner(){
    this._bannerServ.get().subscribe(banner=>{
      this.bannerContent=banner;
      this.temp=this.bannerContent;
      this.bannerFlag=true;
      this.selectedBannerId=this.bannerContent[0].banner_types_id;
      this.updateFilter();
    })
  }

  addBanner(content){
    this.bannerEditMode=false;
    this.bannerForm.reset();
    this.errorMsgShow=false;
    this.bannerForm.get('bannerimg').setValidators(Validators.required);
    this.bannerForm.get('banner_types_id').setValue(this.selectedBannerId);
    this.modalReference = this.modalService.open(content);
  }

  editBanner(item, content){
    this.bannerEditMode=true;
    this.bannerForm.get('bannerimg').clearValidators();
    this.bannerForm.get('id').setValue(item.id);
    this.bannerForm.get('title').setValue(item.title);
    this.bannerForm.get('description').setValue(item.description);
    this.bannerForm.get('banner_types_id').setValue(item.banner_types_id);
    this.modalReference = this.modalService.open(content)
  }

  deleteBanner(index){
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.description = 'You want to delete this Banner';

    modalRef.result.then((result) => {
      if(result){
        this._bannerServ.delete(this.bannerContent[index].id).subscribe(response => {
          this.getAllBanner();
        })
      }
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  updateFilter(event?,id?) {
    let _self=this;
    if(event) this.selectedBannerId=event.target.value;

    const temp1 = this.bannerContent.filter(function(d) {
      return d.banner_types_id==_self.selectedBannerId ;
    });
    this.temp = temp1;
  }

  enlargeImage(value){
    const modalRef = this.modalService.open(ImagePopupComponent);
    modalRef.componentInstance.url = value;
  }

  uploadBanner(){
    this._bannerServ.create(this._bannerServ.createFormData(this.bannerForm.value)).subscribe( response => {
      this.getAllBanner();
      if(this.bannerEditMode == false){
        this.bannerForm.reset();
      }
      // this.modalReference.result.then((result) => {
      //   this.closeResult = `Closed with: ${result}`;
      // }, (reason) => {
      //   this.closeResult = `Dismissed `;
      // });
      this.modalReference.close();
      this.toastr.success('Banner Published Successfully.');
    },
    error=>{
      this.toastr.error('There is some error in Publishing the Banner.');
    });
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
      },
      error=>{})
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
      this.getAllBannerTypes();
      this.getAllBanner();
    })
  }
  //end of banner type section
}
