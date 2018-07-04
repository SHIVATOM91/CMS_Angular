import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../shared/services/menu.service';
import { SettingService } from '../../../shared/services/setting.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  menuList;
  settingData: SettingObj;
  constructor(private _menuServe:MenuService, private _setting: SettingService) { }

  ngOnInit() {
    this._menuServe.getBy('primary').subscribe(response=>{
      this.menuList=response;
    })
    this.getSettingData();
  }

  getSettingData(){
    this._setting.get().subscribe( response => {
      this.settingData=response as SettingObj;
    })
  }

}


export class SettingObj{
  companyName: any;
  description: any;
  primaryPhone: any;
  secondaryPhone: any;
  primaryEmail: any;
  secondaryEmail: any;
  primaryAddress: any;
  secondaryAddress: any;
  facebookLink: any;
  twitterLink: any;
  instaLink: any;
  googleLink: any;
  whatsAppLink: any;
  youtubeLink: any;
  footerMessage: any;
  embedMap: any;
  longitude: any;
  latitude: any;
  logo: any;
}
