import { SettingComponent } from './components/setting/setting.component';
import { NewTeamsComponent } from './components/teams/new-teams/new-teams.component';
import { TeamsComponent } from './components/teams/teams.component';
import { NewPartnersComponent } from './components/partners/new-partners/new-partners.component';
import { PartnersComponent } from './components/partners/partners.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewServicesComponent } from './components/services/new-services/new-services.component';
import { ServicesComponent } from './components/services/services.component';
import { UpdateProjectCategoryComponent } from './components/project/project-category/update-project-category/update-project-category.component';
import { ListProjectCategoryComponent } from './components/project/project-category/list-project-category/list-project-category.component';
import { NewProjectComponent } from './components/project/project/new-project/new-project.component';
import { ManageProjectComponent } from './components/project/project/manage-project.component';
import { ProjectComponent } from './components/project/project.component';
import { AllPostComponent } from './components/post/post/all-post/all-post.component';
import { ManagePostComponent } from './components/post/post/manage-post.component';
import { UpdateComponent } from './components/post/post-category/update/update.component';
import { ListComponent } from './components/post/post-category/list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { BannerComponent } from './components/banner/banner.component';
import { PagesComponent } from './components/pages/pages.component';
import { PostComponent } from './components/post/post.component';
import { NewPagesComponent } from './components/pages/new-pages/new-pages.component';
import { LayoutComponent } from './layout.component';
import { SectionsComponent } from './components/Sections/sections.component';
import { PostCategoryComponent } from './components/post/post-category/post-category.component';
import { EditPagesComponent } from './components/pages/edit-pages/edit-pages.component';
import { NewPostComponent } from './components/post/post/new-post/new-post.component';
import { AllProjectComponent } from './components/project/project/all-project/all-project.component';
import { NewTestimonialsComponent } from './components/testimonials/new-testimonials/new-testimonials.component';


const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'banner', component: BannerComponent },
      {
        path: 'post',
        component: PostComponent,
        children: [
          {path: '', redirectTo: 'latest'},
          {
            path: 'latest',
            component: ManagePostComponent,
            children: [
              {path: '', redirectTo: 'view'},
              {path: 'view', component: AllPostComponent},
              {path: 'update', component: NewPostComponent},
              {path: 'update/:postId', component: NewPostComponent},
            ]
          },
          {
            path: 'category',
            component: PostCategoryComponent,
            children: [
              {path: '', redirectTo: 'list'},
              {path: 'list', component: ListComponent},
              {path: 'update', component: UpdateComponent},
              {path: 'update/:catId', component: UpdateComponent},
            ]
          },
        ]
      },
      {
        path: 'project',
        component: ProjectComponent,
        children: [
          {path: '', redirectTo: 'latest'},
          {
            path: 'latest',
            component: ManageProjectComponent,
            children: [
              {path: '', redirectTo: 'view'},
              {path: 'view', component: AllProjectComponent},
              {path: 'update', component: NewProjectComponent},
              {path: 'update/:projectId', component: NewProjectComponent},
            ]
          },
          {
            path: 'category',
            component: PostCategoryComponent,
            children: [
              {path: '', redirectTo: 'list'},
              {path: 'list', component: ListProjectCategoryComponent},
              {path: 'update', component: UpdateProjectCategoryComponent},
              {path: 'update/:catId', component: UpdateProjectCategoryComponent},
            ]
          },
        ]
      },
      { path: 'page', component: PagesComponent },
      { path: 'sections', component: SectionsComponent },
      { path: 'page/newpage', component: NewPagesComponent },
      { path: 'page/editpage/:sectionId', component: EditPagesComponent },
      { path: 'page/updatepage/:pageId', component: NewPagesComponent },
      { path: 'service', component: ServicesComponent },
      { path: 'new-service', component: NewServicesComponent },
      { path: 'update-service/:serviceId', component: NewServicesComponent },
      { path: 'testimonials', component: TestimonialsComponent },
      { path: 'new-testimonials', component: NewTestimonialsComponent },
      { path: 'update-testimonials/:testimonialId', component: NewTestimonialsComponent },
      { path: 'partners', component: PartnersComponent },
      { path: 'new-partners', component: NewPartnersComponent },
      { path: 'update-partners/:partnerId', component: NewPartnersComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'new-teams', component: NewTeamsComponent },
      { path: 'update-teams/:teamId', component: NewTeamsComponent },
      { path: 'app-settings', component: SettingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
