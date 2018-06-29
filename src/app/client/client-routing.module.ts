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
      {path:"" , component:HomeComponent},
      {path:"about-us" , component:AboutusComponent},
      {path:"services" , component:ServicesComponent},
      {path:"product" , component:ProductComponent},
      {path:"project" , component:ProjectComponent},
      {path:"contact" , component:ContactComponent},
    ]
}
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
