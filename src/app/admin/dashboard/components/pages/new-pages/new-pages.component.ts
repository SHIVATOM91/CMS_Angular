import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-pages',
  templateUrl: './new-pages.component.html',
  styleUrls: ['./new-pages.component.css']
})
export class NewPagesComponent implements OnInit {
   //modal variable
  image
  pageModal={
    "title":"",
    "description":"",
    "bannerimg":"",
  }
  
  constructor() { }

  ngOnInit() {

  }
  handleFileInput(event){
    this.image=event.target.files[0];
  }

  addProperties(Properties){
    console.log()
  }

}
