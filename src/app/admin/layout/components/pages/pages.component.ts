import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../../../../shared/services/page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  pageContent
  constructor(private router:Router , private _pageServ:PageService) { 
    _pageServ.getAll().subscribe(result=>{
      console.log(result)
      this.pageContent=result;
    })
  }
  ngOnInit() {
  }
  addNewPage(){
    this.router.navigate(['admin/dashboard/page/newpage'])
  }
}
