import { Router } from '@angular/router';
import { ProjectService } from './../../../../../../shared/services/project.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../../../../../../shared/components/alert/alert.component';
import { environment } from '../../../../../../../environments/environment';
import { ImagePopupComponent } from '../../../../../../shared/components/image-popup/image-popup.component';

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css']
})
export class AllProjectComponent implements OnInit {
  editing = {};
  selected = [];
  imgUrl=environment.imgUrl;
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'Image' }
  ];
  projectList: Array<ProjectObject>;

  constructor(private _service: ProjectService, private modalService:NgbModal, private router: Router) { }


  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects(){
    this._service.get().subscribe(response => {
      this.projectList = response as ProjectObject[];
    })
  }

  enlargeImage(value){
    const modalRef = this.modalService.open(ImagePopupComponent);
    modalRef.componentInstance.url = value;
  }
  
  onRowSelect(rowIndex){
    this.router.navigate(['admin/project/latest/update', rowIndex ] , { skipLocationChange:true})
  }

  deleteSection(rowIndex ,id ){
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.description = 'You want to delete this project';

    modalRef.result.then((result) => {
      if(result){
        this._service.delete(id).subscribe(response=>{
          this.getAllProjects();
        })
      }
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

}

export class ProjectObject{
  id: any;
  title: any;
  description: any;
  image: any;
}
