import { LoginResponse,Login } from './../../shared/models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userToken = new BehaviorSubject<string>('');

  constructor(private http:HttpClient, private router:Router) {
    this.checkToken();
  }

  get userTokenValue():string{
    return this.userToken.getValue();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  login(authData:Login):Observable< LoginResponse | void >{
    return this.http
      .post<LoginResponse>(`${environment.API_URL}/customers/authenticate`,authData)
      .pipe(
        map((res:LoginResponse)=>{
          this.saveToken(res.token);
          this.loggedIn.next(true);
          this.userToken.next(res.token);
          return res;
        }),
        catchError((error)=>this.handleError(error))
      );
  }
  logout():void{
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.userToken.next('');
    this.router.navigate(['/login']);
  }
  private checkToken():void{
    const userToken = localStorage.getItem('token');
    let token = "";
    let isExpired = true;
    if(userToken != null){
      isExpired = helper.isTokenExpired(userToken);
      token=userToken;
    }
    if(isExpired){
      this.logout();
    }
    else{
      this.loggedIn.next(true);
      this.userToken.next(token);
    }

  }
  private saveToken(token:string):void{
    localStorage.setItem('token',token);
  }
  private handleError(err:any):Observable<never>{
    let errorMessage = 'An Error occurred fecthing data';
    if(err){
      errorMessage = `Error code: ${err.messsage}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
