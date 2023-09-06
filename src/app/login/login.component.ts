import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimprocessorComponent } from '../claimprocessor/claimprocessor.component';
import { UserService } from '../services/user.service';
import { User } from '../services/userlogin';
import { PasswordValidators } from './pwd.validators';
import { UsernameValidators } from './username.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin!:boolean
  loginresponse:any
  user!:User
  constructor(private route:Router,private service:UserService,private httpClient:HttpClient) { }
  f=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email,UsernameValidators.cannotContainSpace]),
    password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(15),PasswordValidators.cannotContainSpaces,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)])
  });
  get email():FormControl{
    return this.f.get('email') as FormControl;
  }
  get password():FormControl{
    return this.f.get('password') as FormControl;
  }
  ngOnInit(): void {
    this.invalidLogin=false;
  }
  // showfailure(){
  //   this.toastr.error('Invalid credentials','Try again',{timeOut:10000});
  // } 

  Login(){
    this.user=new User(String(this.email!.value),String(this.password!.value));
    console.log(this.user);
    this.service.LoginUser(this.user).subscribe(
      res=>{
        console.log(res);
        this.loginresponse=JSON.parse(res);
        const statuscode=(<any>res).StatusCode;
        localStorage.setItem("jwt",this.loginresponse.token);
        localStorage.setItem("role",this.loginresponse.role);
        localStorage.setItem("error",String(this.loginresponse.error));
        localStorage.setItem("email",this.user.email);
        this.invalidLogin=false;
        console.log(this.loginresponse.token);
        console.log(this.loginresponse.role);
        console.log(this.loginresponse.error);
        //this.route.navigate([]);
        if(this.loginresponse.role=="ClaimsProcessor"){
          this.route.navigate(["/claimdashboard"]);
        }
        else{
          this.route.navigate(["/policy"]);
        }
        
      },err=>{
        this.invalidLogin=true;
      }
    )
  }
  // condition(){
  //   localStorage.setItem("role",this.loginresponse.role);
  //   if(this.loginresponse.role=="ClaimsProcessor"){
  //     this.route.navigate(["/claimdashboard"]);
  //   }
  //   else{
  //     this.route.navigate(["/policydashboard"]);
  //   }
  // }
  // Claim(){
  //   this.route.navigate(["/claimdashboard"]);
  // }
  // Policy(){
  //   this.route.navigate(["/policydashboard"]);
  // }

}


