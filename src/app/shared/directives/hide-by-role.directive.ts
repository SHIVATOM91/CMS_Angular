import { Directive, ElementRef } from '@angular/core';
import { AuthService } from '../../admin/services/auth.service';

@Directive({
  selector: '[hideByRole]'
})
export class HideByRoleDirective {

  constructor(private el: ElementRef,private auth:AuthService) { 
    if(auth.currentUser.roles!="admin")  el.nativeElement.style.display = "none"
  }

}
