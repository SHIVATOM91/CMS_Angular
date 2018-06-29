import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   {
      path: 'admin',
      loadChildren: '../app/admin/admin.module#AdminModule'
   },
   {
      path: '',
      loadChildren: '../app/client/client.module#ClientModule'
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
