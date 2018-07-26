import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../../../../shared/services/page.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  pageContent;
  bannerModaltitle;
  pagesFlag=false;
  constructor(private router:Router , private modalService:NgbModal, private _pageServ:PageService) {
    this.getAllPageList();
  }

  ngOnInit() {
  }

  getAllPageList(){
    this._pageServ.get().subscribe(result=>{
      this.pageContent=result;
      this.pagesFlag=true;
    })
  }
  addNewPage(){
    this.router.navigate(['admin/page/newpage'],{skipLocationChange:true})
  }

  editPage(pageItem){
    this.router.navigate(['admin/page/updatepage',pageItem.id],{skipLocationChange:true})
  }

  deletePage(pageItem){
    const modalRef = this.modalService.open(AlertComponent);
    modalRef.componentInstance.type = 'danger';
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.description = 'You want to delete this page';

    modalRef.result.then((result) => {
      if(result){
        this._pageServ.delete(this.pageContent[pageItem].id).subscribe(response=>{
          this.getAllPageList();
        })
      }
    }, (reason) => {
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    
  }
}
