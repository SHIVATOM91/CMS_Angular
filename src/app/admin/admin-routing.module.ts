import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'dashboard',
    loadChildren: '../../app/admin/layout/layout.module#LayoutModule'
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
