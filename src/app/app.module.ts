import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SeoService } from './shared/services/seo.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ToastrService, SeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
