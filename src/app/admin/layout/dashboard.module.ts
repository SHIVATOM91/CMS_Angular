import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BannerComponent } from './components/banner/banner.component';
import { MenuComponent } from './components/menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule, NgbDropdownModule, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { PagesComponent } from './components/pages/pages.component';
import { NewPagesComponent } from './components/pages/new-pages/new-pages.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { SectionComponent } from './templates/section/section.component';
import { PageService } from '../../services/page.service';
@NgModule({
  
  declarations: [DashboardComponent, HeaderComponent,FooterComponent,SidebarComponent, BannerComponent, MenuComponent, PagesComponent, NewPagesComponent, SectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgbModule,
    OwlModule,
    CKEditorModule,
    NgbDropdownModule.forRoot()
  ]
  ,providers:[NgbTabsetConfig,NgbModalStack , PageService]
 
})
export class DashboardModule { }
