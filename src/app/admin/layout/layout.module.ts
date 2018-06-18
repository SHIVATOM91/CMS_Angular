import { BannerPipe } from './components/banner/banner.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { BannerComponent } from './components/banner/banner.component';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule, NgbDropdownModule, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { PagesComponent } from './components/pages/pages.component';
import { NewPagesComponent } from './components/pages/new-pages/new-pages.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { PageService } from '../../shared/services/page.service';
import { SharedModule } from '../../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { InputTemplateComponent } from './templates/input-template/input-template.component';
import { DecriptionTemplateComponent } from './templates/decription-template/decription-template.component';
import { ImageTemplateComponent } from './templates/image-template/image-template.component';
import { SectionsComponent } from './components/Sections/sections.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent,FooterComponent,SidebarComponent, BannerComponent, MenuComponent, PagesComponent, NewPagesComponent,  InputTemplateComponent, DecriptionTemplateComponent, ImageTemplateComponent, SectionsComponent, ProjectsComponent, TestimonialComponent],

  imports: [
    LayoutRoutingModule,
    NgbModule,
    SharedModule,
    CKEditorModule,
    NgbDropdownModule.forRoot()
  ]
  ,providers:[NgbTabsetConfig,NgbModalStack]

})
export class LayoutModule { }
