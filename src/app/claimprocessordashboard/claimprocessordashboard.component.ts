import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Update } from '../services/update';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-claimprocessordashboard',
  templateUrl: './claimprocessordashboard.component.html',
  styleUrls: ['./claimprocessordashboard.component.css']
})
export class ClaimprocessordashboardComponent implements OnInit {
  claimsdata:any[]=[];
  p=0;
  searchText:any;
  claim!:Update;
  Status!: string;
  id!:number;
  claimdata1:any;
  role!:string;
  constructor(private service:UserService,private router:Router) { }

  ngOnInit(): void {
    this.role=localStorage.getItem("role") as string;
    this.GetClaims();
  }

  GetClaims(){
    this.service.GetClaims().subscribe(data=>{
      
      this.claimdata1=data;
      console.log(this.claimdata1);
      for (var i of this.claimdata1){
        console.log(i);

        if(i.status=="Pending"){
          this.claimsdata.push(i);
        }
      }
      console.log(this.claimsdata);
    });
  }
  updateclaim(_status:string){
    
     this.service.Updateclaim(this.id,_status).subscribe(data=>{
       console.log(data);
       if(data=="Claim Status Updated Successfully and email sent successfully"){
        alert("Status updated successfully and Email sent")
       }
     },err=>{
      alert("Updation is not possible");
     })
    
  }
  approve(id:number){
    this.id=id;
    console.log(id);
    
    this.updateclaim("Approved");
  }
  reject(id:number){
    this.id=id;
    console.log(id);
    
    this.updateclaim("Rejected");
  }
  back(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("error");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    this.router.navigate(['login']);
  }
  onDate(selected:string){
    const currentDate=new Date();
    switch(selected){
      case 'today':
        this.filterData(currentDate,currentDate);
        break;
      case 'lastWeek':
        const lastweekdate=new Date(currentDate);
        lastweekdate.setDate(currentDate.getDate()-7);
        this.filterData(lastweekdate,currentDate);
        break;
      case 'lastMonth':
        const lastmonthdate=new Date(currentDate);
        lastmonthdate.setMonth(currentDate.getMonth()-1);
        this.filterData(lastmonthdate,currentDate);
        break;
      case 'last90Days':
        const last90days=new Date(currentDate);
        last90days.setDate(currentDate.getDate()-90);
        this.filterData(last90days,currentDate);
        break;
      default:
        break;
    }
  }
  filterData(startDate:Date,endDate:Date){
    const data=[
      {id:1,date:new Date('2023-09-01')},
      {id:2,date:new Date('2023-09-05')},
      {id:3,date:new Date('2023-09-15')},
    ];
    const filteredata=data.filter((item)=>{
      const itemdate=new Date(item.date);
      return itemdate>=startDate&&itemdate<=endDate;
    });
    
  }
}
