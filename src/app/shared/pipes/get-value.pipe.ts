import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'util';

@Pipe({
  name: 'getValue'
})
export class GetValuePipe implements PipeTransform {

  transform(value: any, key=""): any {
    if(value == null){
      return "";
    }
   
    let retValue="";
    if(!isArray(value)){
      return "";
    }
    console.log(key);
    value.forEach(element => { 
      if(element.key == key){
        console.log(element.type);
        
      }
      // if(element.key==key && element.type!="file" && element.type!="link" && retValue==''){
      //   retValue=element.value;
      // }else if(element.key==key && element.type=="file" && element.type=="link" && retValue==''){
      //   retValue=element.link;
      // }
    });
    return retValue;
  }

}
