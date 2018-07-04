import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../../../../shared/services/page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  pageContent;

  constructor(private router:Router , private _pageServ:PageService) {
    _pageServ.get().subscribe(result=>{
      this.pageContent=result;
    })
  }

  ngOnInit() {
  }

  addNewPage(){
    this.router.navigate(['admin/page/newpage'],{skipLocationChange:true})
  }

  editPage(pageItem){
    this.router.navigate(['admin/page/updatepage',pageItem.id],{skipLocationChange:true})
  }

  deletePage(pageItem){
    // this._pageServ.delete(this.pageContent[pageItem].id).subscribe(response=>{
    //   this.pageContent.splice(pageItem,1)
    // })
  }
}
