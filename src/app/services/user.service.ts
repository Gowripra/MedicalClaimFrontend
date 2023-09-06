import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClaimProcessor } from './claimprocessor';
import { Newclaim } from './Newclaim';
import { PolicyHolder } from './policyholder';
import { Update } from './update';
import { User } from './userlogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private base="https://localhost:7104/api/Users/";
  private base1="https://localhost:7104/api/ClaimProcessRegistrations/";
  private base2="https://localhost:7104/api/PolicyHolders/";
  private base3="https://localhost:7104/api/Claims";
  // https://localhost:7104/api/Claims/Newclaimregister
  private base4="https:localhost:7104/api/Claims/Updateclaim";
  constructor(private http:HttpClient) { }
  
  public LoginUser(user:User):Observable<any>{
    return this.http.post(this.base+"login",user,{responseType:"text"});
  }
  public ClaimRegister(user:ClaimProcessor):Observable<any>{
    return this.http.post(this.base1+"claimregister",user,{responseType:"text"});
  }
  public PolicyHolderRegister(user:PolicyHolder):Observable<any>{
    return this.http.post(this.base2+"register",user,{responseType:"text"})
  }
  public GetClaims(){
    return this.http.get(this.base3+"/Getallclaims");
  }
  public NewclaimReg(user:Newclaim):Observable<any>{
    return this.http.post(this.base3+"/Newclaimregister",user,{responseType:"text"});
  }
  public Updateclaim(claimId:number,status:string):Observable<any>{
    return this.http.put(this.base4,{},{params:{id:claimId,status:status},responseType:"text"});
  }
}
