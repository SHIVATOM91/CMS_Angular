import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BannerService } from '../../../shared/services/banner.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { fade } from '../../../shared/animations/animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    fade
  ]
})
export class HeaderComponent implements OnInit {
  sliderContent;
  page;
  imgUrl=environment.imgUrl;
  constructor(private _bannerServ:BannerService , private router:Router) {
       router.events.subscribe(res=>{
        if(res instanceof NavigationEnd) {
           this.page=this.router.url.split('/')[1];
        }
    })
   }

  ngOnInit() {
    this._bannerServ.getBy('home').subscribe(response=>{
      this.sliderContent=response;
    })

    //

  }
}
