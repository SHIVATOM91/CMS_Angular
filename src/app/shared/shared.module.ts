import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { PageService } from './services/page.service';
import { BannerService } from './services/banner.service';
import { OwlModule } from 'ngx-owl-carousel';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    OwlModule,
    HttpClientModule,
    Angular2FontawesomeModule
  ],
  providers: [  BannerService ,PageService ,NgbAccordionConfig]
})
export class SharedModule { }
