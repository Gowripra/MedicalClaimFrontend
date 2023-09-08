import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimprocessorComponent } from './claimprocessor/claimprocessor.component';
import { LoginComponent } from './login/login.component';
import { PolicyComponent } from './policy/policy.component';

import { PolicyholderComponent } from './policyholder/policyholder.component';
import { PolicyholderdashboardComponent } from './policyholderdashboard/policyholderdashboard.component';
import {Location} from '@angular/common';
import { ClaimprocessordashboardComponent } from './claimprocessordashboard/claimprocessordashboard.component';
import { AuthguardGuard } from './services/authguard.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  // {path:"policy/:policyNumber/:policyHolderName",component:PolicyComponent,
  //  children:[
    {path:"policydashboard",component:PolicyholderdashboardComponent,canActivate:[AuthguardGuard]},
    {path:"create",component:PolicyholderComponent},
    
  //  ]},
  {path:"claimprocessor",component:ClaimprocessorComponent},
  {path:"claimdashboard",component:ClaimprocessordashboardComponent,canActivate:[AuthguardGuard]}
  
            
  
  
   
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 
})
export class AppRoutingModule { }
