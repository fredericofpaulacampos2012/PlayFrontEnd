import { AuthService } from './../../pages/auth/auth.service';
import { Observable } from 'rxjs';
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class AdminInterceptor implements HttpInterceptor{
  constructor(private authSvc: AuthService){}
  intercept(req:HttpRequest<any>,next:HttpHandler): Observable<any>{
    if(!req.url.includes('authenticate')){
      const authToken = this.authSvc.userTokenValue;
      const authReq = req.clone({
        setHeaders :{
          auth : authToken,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
