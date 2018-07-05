import { Router } from '@angular/router';
import { ServicesService } from './../../../../shared/services/services.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagePopupComponent } from '../../../../shared/components/image-popup/image-popup.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  editing = {};
  selected = [];
  imgUrl=environment.imgUrl;
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'featuredImage' }
  ];
  serviceList: Array<ServicesObject>;

  constructor(private _service: ServicesService, private router:Router, private modalService:NgbModal) { }


  ngOnInit() {
    this.getAllServices();
  }

  enlargeImage(value){
    const modalRef = this.modalService.open(ImagePopupComponent);
    modalRef.componentInstance.url = value;
  }

  getAllServices(){
    this._service.get().subscribe(response => {
      this.serviceList = response as ServicesObject[];
    })
  }

  onRowSelect(rowIndex){
    this.router.navigate(['/admin/update-service', rowIndex ] , { skipLocationChange:true})
  }

  deleteSection(rowIndex ,id ){
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.description = 'You want to delete this post';

    modalRef.result.then((result) => {
      if(result){
        this._service.delete(id).subscribe(response=>{
          this.serviceList.splice(rowIndex,1);
        })
      }
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

}

export class ServicesObject{
  id: any;
  title: any;
  description: any;
  featuredImage: any;
}
