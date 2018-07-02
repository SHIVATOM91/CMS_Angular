import { TestimonialsService } from './services/testimonials.service';
import { ServicesService } from './services/services.service';
import { PostService } from './services/post.service';
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
import { IcheckDirective } from './directives/icheck.directive';
import { ProjectCategoryService } from './services/project-category.service';
import { ProjectService } from './services/project.service';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  declarations: [IcheckDirective, ReversePipe],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
    HttpClientModule,
    Angular2FontawesomeModule,
    NgxDatatableModule,
    IcheckDirective,
    ReversePipe
  ],
  providers: [ ReversePipe, BannerService , BannerTypeService,PageService, MenuService, FormBuilder,NgbAccordionConfig ,SectionsService, PostCategoryService, PostService, ProjectCategoryService, ProjectService,ServicesService, TestimonialsService]

})
export class SharedModule { }
