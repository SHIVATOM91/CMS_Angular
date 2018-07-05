import { ProjectCategoryService } from './../../../../../../shared/services/project-category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../../../../../../shared/components/alert/alert.component';
import { ImagePopupComponent } from '../../../../../../shared/components/image-popup/image-popup.component';

@Component({
  selector: 'app-list-project-category',
  templateUrl: './list-project-category.component.html',
  styleUrls: ['./list-project-category.component.css']
})
export class ListProjectCategoryComponent implements OnInit {
  editing = {};
  selected = [];
  imgUrl= environment.imgUrl;
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'Image' }
  ];
  categoryList: Array<CategoryObject>;
  constructor(private _service: ProjectCategoryService, private modalService:NgbModal, private router: Router) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories(){
    this._service.get().subscribe(response => {
      this.categoryList = response as CategoryObject[];

    })
  }

  enlargeImage(value){
    const modalRef = this.modalService.open(ImagePopupComponent);
    modalRef.componentInstance.url = value;
  }
  
  onRowSelect(rowIndex){
    this.router.navigate(['admin/project/category/update', rowIndex ] , { skipLocationChange:true})
  }

  deleteSection(rowIndex ,id ){
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.description = 'You want to delete this post';

    modalRef.result.then((result) => {
      if(result){
        this._service.delete(id).subscribe(response=>{
          this.categoryList.splice(rowIndex,1);
        })
      }
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }



}

export class CategoryObject{
  title: any;
  description: any;
  image: any;
}
