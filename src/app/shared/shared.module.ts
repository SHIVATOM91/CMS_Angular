import { MenuService } from './services/menu.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { PageService } from './services/page.service';
import { BannerService } from './services/banner.service';
import { OwlModule } from 'ngx-owl-carousel';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
    HttpClientModule,
    CustomFormsModule,
    Angular2FontawesomeModule
  ],
  providers: [  BannerService ,PageService, MenuService, FormBuilder]
})
export class SharedModule { }
