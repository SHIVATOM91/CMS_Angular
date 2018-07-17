import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  pushRightClass: string = 'push-right';
  constructor(public authServ:AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.authServ.logout();
  }
  
  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle('rtl');
  }

  onLoggedout() {
      localStorage.removeItem('isLoggedin');
  }

 
}
