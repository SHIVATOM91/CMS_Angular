import { NewTeamsComponent } from './components/teams/new-teams/new-teams.component';
import { NewPartnersComponent } from './components/partners/new-partners/new-partners.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ProjectComponent } from './components/project/project.component';
import { AllProjectComponent } from './components/project/project/all-project/all-project.component';
import { NewProjectComponent } from './components/project/project/new-project/new-project.component';
import { ListProjectCategoryComponent } from './components/project/project-category/list-project-category/list-project-category.component';
import { UpdateProjectCategoryComponent } from './components/project/project-category/update-project-category/update-project-category.component';
import { ProjectCategoryComponent } from './components/project/project-category/project-category.component';
import { ManagePostComponent } from './components/post/post/manage-post.component';
import { PostComponent } from './components/post/post.component';
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
import { DragulaModule } from 'ng2-dragula';
import { PostCategoryComponent } from './components/post/post-category/post-category.component';
import { UpdateComponent } from './components/post/post-category/update/update.component';
import { ListComponent } from './components/post/post-category/list/list.component';
import { EditPagesComponent } from './components/pages/edit-pages/edit-pages.component';
import { NewPostComponent } from './components/post/post/new-post/new-post.component';
import { AllPostComponent } from './components/post/post/all-post/all-post.component';
import { ManageProjectComponent } from './components/project/project/manage-project.component';
import { ServicesComponent } from './components/services/services.component';
import { NewServicesComponent } from './components/services/new-services/new-services.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewTestimonialsComponent } from './components/testimonials/new-testimonials/new-testimonials.component';
import { MenuPipe } from './components/menu/menu.pipe';
import { PartnersComponent } from './components/partners/partners.component';
import { TeamsComponent } from './components/teams/teams.component';
import { SettingComponent } from './components/setting/setting.component';
import { UserListComponent } from './components/users/user-list/user-list.component';



@NgModule({
<<<<<<< HEAD
  declarations: [LayoutComponent, HeaderComponent, FooterComponent,SidebarComponent, BannerComponent, MenuComponent, PagesComponent, NewPagesComponent,  InputTemplateComponent, DecriptionTemplateComponent, ImageTemplateComponent, SectionsComponent, TestimonialsComponent, NewTestimonialsComponent , BannerPipe, PostComponent, ManagePostComponent, PostCategoryComponent, UpdateComponent, ListComponent, EditPagesComponent, NewPostComponent, AllPostComponent, ProjectComponent, ProjectCategoryComponent, UpdateProjectCategoryComponent, ListProjectCategoryComponent, ManageProjectComponent, NewProjectComponent, AllProjectComponent, ServicesComponent, NewServicesComponent, DashboardComponent, MenuPipe,PartnersComponent, NewPartnersComponent, TeamsComponent, NewTeamsComponent, SettingComponent],
=======
  declarations: [LayoutComponent, HeaderComponent,UserListComponent, EllipsisPipePipe,FooterComponent,SidebarComponent,  BannerComponent, MenuComponent, PagesComponent, NewPagesComponent,  InputTemplateComponent, DecriptionTemplateComponent, ImageTemplateComponent, SectionsComponent, TestimonialsComponent, NewTestimonialsComponent , BannerPipe, PostComponent, ManagePostComponent, PostCategoryComponent, UpdateComponent, ListComponent, EditPagesComponent, NewPostComponent, AllPostComponent, ProjectComponent, ProjectCategoryComponent, UpdateProjectCategoryComponent, ListProjectCategoryComponent, ManageProjectComponent, NewProjectComponent, AllProjectComponent, ServicesComponent, NewServicesComponent, DashboardComponent, MenuPipe,PartnersComponent, NewPartnersComponent, TeamsComponent, NewTeamsComponent, SettingComponent],
>>>>>>> b254fe2008fe526d3de0bdeb7716667f77fa418e

  imports: [
    LayoutRoutingModule,
    NgbModule,
    SharedModule,
    CKEditorModule,
    DragulaModule,
    NgbDropdownModule.forRoot()
  ]
  ,providers:[NgbTabsetConfig,NgbModalStack]

})
export class LayoutModule { }
