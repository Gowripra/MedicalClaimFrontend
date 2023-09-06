import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private router:Router,private inject:Injector) { }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    let service=this.inject.get(UserService);
    const token=localStorage.getItem('jwt');
    if(token!=null){
      req=req.clone({
        setHeaders:{
          Authorization:'Bearer '+localStorage.getItem('jwt')||''
        }
      });
    }
    return next.handle(req)
    .pipe(
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status==401)
          {
            this.router.navigate(['/login']);
          }
        }
        return throwError(err);
      })
    );
  }
}
