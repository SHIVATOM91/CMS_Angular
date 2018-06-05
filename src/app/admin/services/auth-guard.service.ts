import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';




@Injectable()
export class AuthGuardService implements CanActivate    {

  constructor( private auth:AuthService , private router:Router ) { }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    if(this.auth.isloggedin())
      return true;
    else{
      this.router.navigate(['/admin']);
      return false;
    }
  }
}
