import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuList;
  constructor(private _menuServe:MenuService) { }
  ngOnInit() {
    this._menuServe.getBy('primary').subscribe(response=>{
      this.menuList=response;
    })
  }

}
