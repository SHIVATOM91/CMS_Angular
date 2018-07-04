import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mfilter'
})
export class MenuPipe implements PipeTransform {

  transform(menuList: any[], selectedTypeId: string): any[] {
    if(!menuList)
      return [];
    if(!selectedTypeId)
      return [];
    return menuList.filter( menu => {
      if(menu.menuType == selectedTypeId){
        return true;
      }else{
        return false;
      }
    });
  }

}
