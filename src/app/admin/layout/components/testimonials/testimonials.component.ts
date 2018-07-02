import { TestimonialsService } from './../../../../shared/services/testimonials.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  editing = {};
  selected = [];
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'featuredImage' }
  ];
  testimonialList: Array<TestimonialsObject>;

  constructor(private _service: TestimonialsService, private router:Router) { }


  ngOnInit() {
    this.getAllTestimonials();
  }

  getAllTestimonials(){
    this._service.get().subscribe(response => {
      this.testimonialList = response as TestimonialsObject[];
    })
  }



  onRowSelect(){

    if(this.selected.length > 0)
      this.router.navigate(['/admin/update-testimonials', this.selected[0].id ] , { skipLocationChange:true})
  }

}

export class TestimonialsObject{
  id: any;
  title: any;
  description: any;
  featuredImage: any;
}
