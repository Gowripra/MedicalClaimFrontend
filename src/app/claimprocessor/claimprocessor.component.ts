import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimProcessor } from '../services/claimprocessor';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-claimprocessor',
  templateUrl: './claimprocessor.component.html',
  styleUrls: ['./claimprocessor.component.css']
})
export class ClaimprocessorComponent implements OnInit {
  claimprocessor!:ClaimProcessor
  adddetails!:boolean
  role!:string
  constructor(private router:Router,private service:UserService) { }
  back(){
    this.router.navigate(['login']);
  }
  
  register=new FormGroup({
    fullName:new FormControl("",Validators.required),
    email: new FormControl("", [Validators.required,Validators.email]),    
    password: new FormControl("", [Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)]),                                  
  });
  get fullName():FormControl{
    return this.register.get('fullName') as FormControl;
  }
  get email():FormControl{
    return this.register.get('email') as FormControl;
  }
  get password():FormControl{
    return this.register.get('password') as FormControl;
  }
  clear(){
    this.register=new FormGroup({
      fullName:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl('')
    });
  }
  ngOnInit(): void {
    this.adddetails=false;
    this.role=String(localStorage.getItem("role"));
  }
  claimregister(){
    this.claimprocessor={
      fullName:this.fullName!.value as string,
      email:this.email!.value as string,
      password:this.password!.value as string
    }
    this.service.ClaimRegister(this.claimprocessor).subscribe(res=>{
      this.adddetails=false;
      alert(this.claimprocessor.email+"Registered successfully!");
      this.router.navigate(['login']);
    },err=>{
      this.adddetails=true;
      alert("email already existed");
    })
  }

}
