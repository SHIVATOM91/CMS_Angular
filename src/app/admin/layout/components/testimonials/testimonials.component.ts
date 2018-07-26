import { TestimonialsService } from './../../../../shared/services/testimonials.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { environment } from '../../../../../environments/environment';
import { ImagePopupComponent } from '../../../../shared/components/image-popup/image-popup.component';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  editing = {};
  selected = [];
  imgUrl=environment.imgUrl;
  testinomialFlag=false;
  testimonialList: Array<TestimonialsObject>;

  constructor(private modalService:NgbModal, private _service: TestimonialsService, private router:Router) { }


  ngOnInit() {
    this.getAllTestimonials();
  }

  getAllTestimonials(){
    this._service.get().subscribe(response => {
      this.testimonialList = response as TestimonialsObject[];
      this.testinomialFlag=true;
    })
  }

  enlargeImage(value){
    const modalRef = this.modalService.open(ImagePopupComponent);
    modalRef.componentInstance.url = value;
  }
  
  onRowSelect(rowIndex){
      this.router.navigate(['/admin/update-testimonials', rowIndex] , { skipLocationChange:true})
  }

  deleteSection(rowIndex ,id ){
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.description = 'You want to delete this testimonial';

    modalRef.result.then((result) => {
     
      if(result){
        this._service.delete(id).subscribe(response=>{
          this.getAllTestimonials();
        })
      }
    }, (reason) => {
    // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}

export class TestimonialsObject{
  id: any;
  title: any;
  description: any;
  featuredImage: any;
}
