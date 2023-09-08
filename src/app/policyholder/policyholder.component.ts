import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PolicyHolder } from '../services/policyholder';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-policyholder',
  templateUrl: './policyholder.component.html',
  styleUrls: ['./policyholder.component.css']
})
export class PolicyholderComponent implements OnInit {
  policyholder!:PolicyHolder
  adddetails!:boolean
  role!:string
  constructor(private router:Router,private service:UserService) { }
  back(){
    this.router.navigate(['login']);
  }
  
  register=new FormGroup({
    policyHolderName:new FormControl("",Validators.required),
    age:new FormControl("",Validators.required),
    gender:new FormControl("",Validators.required),
    dateofBirth:new FormControl("",Validators.required),
    email: new FormControl("", [Validators.required,Validators.email]),    
    password: new FormControl("", [Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)]),                    
    policyType:new FormControl("",Validators.required)              
  });
  get policyHolderName():FormControl{
    return this.register.get('policyHolderName') as FormControl;
  }
  get age():FormControl{
    return this.register.get('age') as FormControl;
  }
  get gender():FormControl{
    return this.register.get('gender') as FormControl;
  }
  get dateofBirth():FormControl{
    return this.register.get('dateofBirth') as FormControl;
  }
  get email():FormControl{
    return this.register.get('email') as FormControl;
  }
  get password():FormControl{
    return this.register.get('password') as FormControl;
  }
  get policyType():FormControl{
    return this.register.get('policyType') as FormControl;
  }
  clear(){
    this.register=new FormGroup({
      policyHolderName:new FormControl(''),
      age:new FormControl(''),
      gender:new FormControl(''),
      dateofBirth:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl(''),
      policyType:new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.adddetails=false;
    this.role=String(localStorage.getItem("role"))
  }
  policyregister(){
    this.policyholder={
      policyHolderName:this.policyHolderName!.value as string,
      age:Number(this.age!.value),
      gender:this.gender!.value as string,
      dateofBirth:this.dateofBirth!.value as string,
      email:this.email!.value as string,
      password:this.password!.value as string,
      policyType:this.policyType!.value as string
    }
    this.service.PolicyHolderRegister(this.policyholder).subscribe(res=>{
      if(res== "user added"){
        this.adddetails=false;
        alert(this.policyholder.email+" Registered successfully!");
        this.router.navigate(['login']);
      }
    },err=>{
      this.adddetails=true;
      alert("user already existed");
    });
  }

}
