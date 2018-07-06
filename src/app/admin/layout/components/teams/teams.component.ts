import { TeamsService } from './../../../../shared/services/teams.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { environment } from '../../../../../environments/environment';
import { ImagePopupComponent } from '../../../../shared/components/image-popup/image-popup.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  editing = {};
  selected = [];
  imgUrl=environment.imgUrl;
  columns = [
    { prop: 'title' },
    { name: 'Description' },
    { name: 'featuredImage' }
  ];
  teamList: Array<TeamsObject>;

  constructor(private modalService:NgbModal, private _service: TeamsService, private router:Router) { }


  ngOnInit() {
    this.getAllTeams();
  }

  getAllTeams(){
    this._service.get().subscribe(response => {
      this.teamList = response as TeamsObject[];
    })
  }

  enlargeImage(value){
    const modalRef = this.modalService.open(ImagePopupComponent);
    modalRef.componentInstance.url = value;
  }

  onRowSelect(rowIndex){
      this.router.navigate(['/admin/update-teams', rowIndex] , { skipLocationChange:true})
  }

  deleteSection(rowIndex ,id ){
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.description = 'You want to delete this team';

    modalRef.result.then((result) => {

      if(result){
        this._service.delete(id).subscribe(response=>{
          this.getAllTeams();
        })
      }
    }, (reason) => {
    // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}

export class TeamsObject{
  id: any;
  title: any;
  description: any;
  featuredImage: any;
}
