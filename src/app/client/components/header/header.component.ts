import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BannerService } from '../../../shared/services/banner.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  sliderContent;
  imgUrl=environment.imgUrl;
  constructor(private _bannerServ:BannerService) { }

  ngOnInit() {
    this._bannerServ.getBy('home').subscribe(response=>{
      this.sliderContent=response;
    })
  }
}