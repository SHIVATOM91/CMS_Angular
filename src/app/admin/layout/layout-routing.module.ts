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
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PostCategoryComponent } from './components/post/post-category/post-category.component';
import { EditPagesComponent } from './components/pages/edit-pages/edit-pages.component';
import { NewPostComponent } from './components/post/post/new-post/new-post.component';


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
      { path: 'page', component: PagesComponent },
      { path: 'sections', component: SectionsComponent },
      { path: 'testimonial', component: TestimonialComponent },
      { path: 'projets', component: ProjectsComponent },
      { path: 'page/newpage', component: NewPagesComponent },
      { path: 'page/editpage/:sectionId', component: EditPagesComponent },
      { path: 'page/updatepage/:pageId', component: NewPagesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
