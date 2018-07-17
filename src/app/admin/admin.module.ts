import { ToastrService } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

import {NgbModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { BannerService } from '../shared/services/banner.service';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from './services/auth-guard.service';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ForgotService } from '../shared/services/forgot.service';

@NgModule({
  declarations: [ LoginComponent, ForgotComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [AuthService ,  BannerService , AuthGuardService,ForgotService]

})
export class AdminModule { }
