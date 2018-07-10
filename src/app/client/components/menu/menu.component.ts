import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuList;
  toggleMenu=true;
  constructor(private _menuServe:MenuService) { }
  ngOnInit() {
    this._menuServe.getBy('primary').subscribe(response=>{
      this.menuList=response;
    })
  }
  toggle(){
    this.toggleMenu=!this.toggleMenu;
  }

}
