import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  policynumber:any;
  policyholdername:any;
  name:any;
  constructor(private service:UserService,private router:Router,private route:ActivatedRoute) { }
  register=new FormGroup({
    
    policyNumber:new FormControl({value:localStorage.getItem('policyNumber'),disabled:true}),
    policyType:new FormControl({value:localStorage.getItem('policyType'),disabled:true}),
    policyHolderName:new FormControl({value:localStorage.getItem('policyHolderName'),disabled:true}),
    dateofAdmitted:new FormControl("",Validators.required),
    cashType:new FormControl("",Validators.required),
    remainingClaims:new FormControl({value:"",disabled:true}/*"",Validators.required*/),
    dateofDischarged:new FormControl("",Validators.required),
    notes:new FormControl("",Validators.required)
  });
  // get claimId():FormControl{
  //   return this.register.get('claimId') as FormControl;
  // }
  get policyNumber(){
    return this.register.get('policyNumber') ;
  }
  get policyType(){
    return this.register.get('policyType'); 
  }
  get policyHolderName(){
    return this.register.get('policyHolderName'); 
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
   // this.policynumber=this.route.snapshot.params['policyNumber']
    //this.policyholdername=this.route.snapshot.params['policyHolderName']
    //this.setForm();
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
    localStorage.removeItem("policyNumber");
    localStorage.removeItem("policyHolderName");
    localStorage.removeItem("policyType");
    this.router.navigate(['login']);
  }
  openModel(){
    console.log("popup started"+ localStorage.getItem("policyNumber"));
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
    console.log("new claim started" );
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
      this.router.navigate(['policyholder']);
    },err=>{
      this.adddetails=true;
      alert("Maximum claim submission limit exceeded for this month");
      console.log(err);
      
    });
  }
  // setForm():void{
  //   this.register.get("policyNumber")?.setValue(this.policynumber);
  //   this.register.get("policyHolderName")?.setValue(this.policyholdername);
  //   this.name=this.policyholdername;
  // }
}
