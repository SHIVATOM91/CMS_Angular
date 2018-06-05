import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { DataModalService } from './shared/data-modal.service';

import {NgbModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { BannerService } from '../services/banner.service';

@NgModule({
  declarations: [ LoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    
  ],
  providers: [AuthService , DataModalService, BannerService]
  
})
export class AdminModule { }
