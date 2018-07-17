import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProductComponent } from './pages/product/product.component';
import { ProjectComponent } from './pages/project/project.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path:"" , component:LayoutComponent,
    children:[
      {path:"" , component:HomeComponent, data:{bannerType:'homeBanner'}},
      {path:"about-us" , component:AboutusComponent, data:{bannerType:'aboutBanner'}},
      {path:"services" , component:ServicesComponent, data:{bannerType:'servicesBanner'}},
      {path:"product" , component:ProductComponent, data:{bannerType:'productBanner'}},
      {path:"project" , component:ProjectComponent, data:{bannerType:'projectBanner'}},
      {path:"contact" , component:ContactComponent , data:{bannerType:'contactBanner'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
