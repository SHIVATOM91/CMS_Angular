import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'forgot/:token',
    component: ForgotComponent
  },
  {
    path:'',
    loadChildren: '../../app/admin/layout/layout.module#LayoutModule',
    canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
