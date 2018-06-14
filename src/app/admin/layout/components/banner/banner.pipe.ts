import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'bfilter'
})
export class BannerPipe implements PipeTransform {

  transform(banners: any[], selectedTypeId: string): any[] {
    if(!banners)
      return [];
    if(!selectedTypeId)
      return [];

    return banners.filter( banner => {
      if(banner.banner_types.id == selectedTypeId){
        return true;
      }else{
        return false;
      }
    });
  }
}
