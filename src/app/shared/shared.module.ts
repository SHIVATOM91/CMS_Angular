import { PostCategoryService } from './services/post-category.service';
import { BannerTypeService } from './services/banner-type.service';
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
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { SectionsService } from './services/sections.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
    HttpClientModule,
    Angular2FontawesomeModule,
    NgxDatatableModule
  ],
  providers: [  BannerService , BannerTypeService,PageService, MenuService, FormBuilder,NgbAccordionConfig ,SectionsService, PostCategoryService]

})
export class SharedModule { }
