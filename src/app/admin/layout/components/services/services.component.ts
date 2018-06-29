import { Router } from '@angular/router';
import { ServicesService } from './../../../../shared/services/services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  editing = {};
  selected = [];
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'featuredImage' }
  ];
  serviceList: Array<ServicesObject>;

  constructor(private _service: ServicesService, private router:Router) { }


  ngOnInit() {
    this.getAllServices();
  }

  getAllServices(){
    this._service.get().subscribe(response => {
      this.serviceList = response as ServicesObject[];
    })
  }



  onRowSelect(){

    if(this.selected.length > 0)
      this.router.navigate(['/admin/update-service', this.selected[0].id ] , { skipLocationChange:true})
  }

}

export class ServicesObject{
  id: any;
  title: any;
  description: any;
  featuredImage: any;
}
