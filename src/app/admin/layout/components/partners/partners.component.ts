import { PartnersService } from './../../../../shared/services/partners.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { environment } from '../../../../../environments/environment';
import { ImagePopupComponent } from '../../../../shared/components/image-popup/image-popup.component';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  editing = {};
  selected = [];
  imgUrl=environment.imgUrl;
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'featuredImage' }
  ];
  partnerList: Array<PartnersObject>;

  constructor(private modalService:NgbModal, private _service: PartnersService, private router:Router) { }


  ngOnInit() {
    this.getAllPartners();
  }

  getAllPartners(){
    this._service.get().subscribe(response => {
      this.partnerList = response as PartnersObject[];
    })
  }

  enlargeImage(value){
    const modalRef = this.modalService.open(ImagePopupComponent);
    modalRef.componentInstance.url = value;
  }

  onRowSelect(rowIndex){
      this.router.navigate(['/admin/update-partners', rowIndex] , { skipLocationChange:true})
  }

  deleteSection(rowIndex ,id ){
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.description = 'You want to delete this partner';

    modalRef.result.then((result) => {

      if(result){
        this._service.delete(id).subscribe(response=>{
          this.partnerList.splice(rowIndex,1);
        })
      }
    }, (reason) => {
    // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}

export class PartnersObject{
  id: any;
  title: any;
  description: any;
  featuredImage: any;
}
