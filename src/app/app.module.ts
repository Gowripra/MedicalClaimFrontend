import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PolicyholderComponent } from './policyholder/policyholder.component';
import { ClaimprocessorComponent } from './claimprocessor/claimprocessor.component';
import { RouterModule,Routes } from '@angular/router';
import { PolicyholderdashboardComponent } from './policyholderdashboard/policyholderdashboard.component';
import { PolicyComponent } from './policy/policy.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ClaimprocessordashboardComponent } from './claimprocessordashboard/claimprocessordashboard.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
//import { MatDialogModule } from '@angular/material/dialog'
export function tokenGetter(){
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PolicyholderComponent,
    ClaimprocessorComponent,
    PolicyholderdashboardComponent,
    PolicyComponent,
    ClaimprocessordashboardComponent,
   

  ],
  imports: [
  //  Ng2SearchPipeModule,
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        allowedDomains:["http://localhost:4200"],
        disallowedRoutes:[]
      }
    }),
   
   
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
