import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Newclaim } from '../services/Newclaim';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-policyholderdashboard',
  templateUrl: './policyholderdashboard.component.html',
  styleUrls: ['./policyholderdashboard.component.css']
})
export class PolicyholderdashboardComponent implements OnInit {
  claimsdata!:any;
  p=0;
  searchText:any;
  newclaim!:Newclaim
  adddetails!:Boolean
  role!:string;
  constructor(private service:UserService,private router:Router) { }
  register=new FormGroup({
    
    policyNumber:new FormControl("",Validators.required),
    policyType:new FormControl("",Validators.required),
    policyHolderName:new FormControl("",Validators.required),
    dateofAdmitted:new FormControl("",Validators.required),
    cashType:new FormControl("",Validators.required),
    remainingClaims:new FormControl({value:"",disabled:true}/*"",Validators.required*/),
    dateofDischarged:new FormControl("",Validators.required),
    notes:new FormControl("",Validators.required)
  });
  // get claimId():FormControl{
  //   return this.register.get('claimId') as FormControl;
  // }
  get policyNumber():FormControl{
    return this.register.get('policyNumber') as FormControl;
  }
  get policyType():FormControl{
    return this.register.get('policyType') as FormControl; 
  }
  get policyHolderName():FormControl{
    return this.register.get('policyHolderName') as FormControl; 
  }
  get dateofAdmitted():FormControl{
    return this.register.get('dateofAdmitted') as FormControl; 
  }
  get cashType():FormControl{
    return this.register.get('cashType') as FormControl; 
  }
  get remainingClaims():FormControl{
    return this.register.get('remainingClaims') as FormControl; 
  }
  get dateofDischarged():FormControl{
    return this.register.get('dateofDischarged') as FormControl; 
  }
  get notes():FormControl{
    return this.register.get('notes') as FormControl; 
  }
  ngOnInit(): void {
    this.GetClaim();
    this.role=localStorage.getItem("role") as string;
    
  }
  GetClaim(){
    this.service.GetClaims().subscribe(data=>{
      this.claimsdata=data;
    });
  }
  back(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("error");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    this.router.navigate(['login']);
  }
  openModel(){
    console.log("popup started");
    const modalDiv=document.getElementById('myModal');
    if(modalDiv!=null){
      modalDiv.style.display='block';
      //this.NewClaim()
    }
  }
  closeModel(){
    const modalDiv=document.getElementById('myModal');
    if(modalDiv!=null){
      modalDiv.style.display='none';
    }
  }
  //Debugger;
  NewClaim(){
    console.log("new claim started");
    this.newclaim={
      claimId:0,
      policyNumber:Number(this.policyNumber!.value),
      policyType:this.policyType!.value as string,
      policyHolderName:this.policyHolderName!.value as string,
      dateofAdmitted:this.dateofAdmitted!.value as Date,
      cashType:this.cashType!.value as string,
      remainingClaims:0,
      dateofDischarged:this.dateofDischarged!.value as Date,
      notes:this.notes!.value as string
    }
    this.service.NewclaimReg(this.newclaim).subscribe(res=>{
      this.adddetails=false;
      alert(this.newclaim.policyHolderName+" Registered Successfully !");
      this.router.navigate(['policy']);
    },err=>{
      this.adddetails=true;
      alert("Maximum claim submission limit exceeded for this month");
      console.log(err);
      
    });
  }
}
