import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIcheck]'
})
export class IcheckDirective {
  @Input()
  appIcheck: string;
  constructor(private el: ElementRef) {
      el.nativeElement.classList.add("mystyle");
      console.log(el.nativeElement);


  }
}
