import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/services/menu.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  menuList;
  constructor(private _menuServe:MenuService) { }

  ngOnInit() {
    this._menuServe.getBy('primary').subscribe(response=>{
      this.menuList=response;
    })
  }

}
