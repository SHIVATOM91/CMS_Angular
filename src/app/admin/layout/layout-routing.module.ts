import { UpdateComponent } from './components/post/post-category/update/update.component';
import { ListComponent } from './components/post/post-category/list/list.component';
import { AllPostComponent } from './components/post/all-post/all-post.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { BannerComponent } from './components/banner/banner.component';
import { PagesComponent } from './components/pages/pages.component';
import { PostComponent } from './components/post/post.component';
import { NewPagesComponent } from './components/pages/new-pages/new-pages.component';
import { LayoutComponent } from './layout.component';
import { SectionsComponent } from './components/Sections/sections.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PostCategoryComponent } from './components/post/post-category/post-category.component';


const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [
      { path: 'menu', component: MenuComponent },
      { path: 'banner', component: BannerComponent },
      {
        path: 'post',
        component: PostComponent,
        children: [
          {path: '', redirectTo: 'all'},
          {path: 'all', component: AllPostComponent},
          {
            path: 'category',
            component: PostCategoryComponent,
            children: [
              {path: '', redirectTo: 'list'},
              {path: 'list', component: ListComponent},
              {path: 'update', component: UpdateComponent},
            ]
          },
        ]
      },
      { path: 'page', component: PagesComponent },
      { path: 'sections', component: SectionsComponent },
      { path: 'testimonial', component: TestimonialComponent },
      { path: 'projets', component: ProjectsComponent },
      { path: 'page/newpage', component: NewPagesComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
