import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { BannerComponent } from './components/banner/banner.component';
import { PagesComponent } from './components/pages/pages.component';
import { NewPagesComponent } from './components/pages/new-pages/new-pages.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: [
      { path: 'menu', component: MenuComponent },
      { path: 'banner', component: BannerComponent },
      { path: 'page', component: PagesComponent },
      { path: 'page/newpage', component: NewPagesComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
