import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  pageContent
  constructor(private router:Router) { 
    this.pageContent=[
      { "title":"page 1" , "description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. " ,"bannerimg":""},
      { "title":"page 2" , "description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry." ,"bannerimg":""},
      { "title":"page 3" , "description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry." ,"bannerimg":""},
      { "title":"page 4" , "description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry." ,"bannerimg":""},
      { "title":"page 5" , "description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry." ,"bannerimg":""}
    ]
  }
  ngOnInit() {
  }
  addNewPage(){
    this.router.navigate(['admin/dashboard/page/newpage'])
  }

}
