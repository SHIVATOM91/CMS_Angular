import { BannerTypeService } from './../../../../shared/services/banner-type.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
    })
  }

  addBanner(content){
    this.bannerEditMode=false;
    this.errorMsgShow=false;
    this.bannerForm.get('bannerimg').setValidators(Validators.required);
    this.bannerForm.get('banner_types_id').setValue(this.selectedBannerId);
    this.modalService.open(content)
  }

  editBanner(item, content){
    this.bannerEditMode=true;
    this.bannerForm.get('bannerimg').clearValidators();
    this.bannerForm.get('id').setValue(item.id);
    this.bannerForm.get('title').setValue(item.title);
    this.bannerForm.get('description').setValue(item.description);
    this.bannerForm.get('banner_types_id').setValue(item.banner_types_id);
    this.modalService.open(content)
  }

  deleteBanner(index){
    let success=confirm("Are you sure want to delete this item");
    if(success){
      this._bannerServ.delete(this.bannerContent[index].id).subscribe(response => {
        this.bannerContent.splice(index,1)
      })
    }
  }


  uploadBanner()
  {
    this._bannerServ.create(this._bannerServ.createFormData(this.bannerForm.value)).subscribe( response => {
      this.getAllBanner();
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
