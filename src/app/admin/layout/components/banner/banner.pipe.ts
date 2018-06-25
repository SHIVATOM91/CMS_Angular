import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'bfilter',
  pure: false
})
export class BannerPipe implements PipeTransform {

  transform(bannerList: any[], selectedTypeId: string): any[] {
    if(!bannerList)
      return [];
    if(!selectedTypeId)
      return [];

    return bannerList.filter( banner => {
      if(banner.banner_types.id == selectedTypeId){
        return true;
      }else{
        return false;
      }
    });
  }
}
