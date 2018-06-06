import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './layout/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'dashboard',
    loadChildren: '../../app/admin/layout/dashboard.module#DashboardModule'
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
