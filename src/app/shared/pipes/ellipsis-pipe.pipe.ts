import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipePipe implements PipeTransform {

  transform(value: any, args?: any , element?: any): any {
    if(args === undefined) {
      return value;
    }
    if(value.length > args){
      var res = value.substring(0, args);
      var count=res.lastIndexOf(" ");
      var result = value.substring(0, count);
      return result + '...';
    }
  }

}
