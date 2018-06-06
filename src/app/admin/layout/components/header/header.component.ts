import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor( private authServ:AuthService) { }

  ngOnInit() {
  }
  logout(){
    this.authServ.logout();
  }
}
