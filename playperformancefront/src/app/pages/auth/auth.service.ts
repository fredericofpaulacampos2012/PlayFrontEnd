import { LoginResponse,Login } from './../../shared/models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(authData:Login):Observable< LoginResponse | void >{
    return this.http
      .post<LoginResponse>(`${environment.API_URL}/customers/authenticate`,authData)
      .pipe(
        map((res:LoginResponse)=>{
          this.saveToken(res.token);
        }),
        catchError((error)=>this.handleError(error))
      );
  }
  logout():void{
    localStorage.removeItem('token');
    //set userIsLogged = false;
  }
  private checkToken():void{
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
