import { catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<User[]>{
    return this.http
      .get<User[]>(`${environment.API_URL}/customers`)
      .pipe(catchError(this.handleError));
  }
  getUserById(userid:string):Observable<User>{
    return this.http
      .get<User>(`${environment.API_URL}/customers/admin/${userid}`)
      .pipe(catchError(this.handleError));
  }
  newUser(user:User):Observable<User>{
    return this.http
      .post<User>(`${environment.API_URL}/customers`,user)
      .pipe(catchError(this.handleError));
  }
  updateUser(userid:string,user:User):Observable<User>{
    return this.http
    .put<User>(`${environment.API_URL}/customers/${userid}`,user)
    .pipe(catchError(this.handleError));
  }
  deleteUser(userid:string):Observable<{}>{
    return this.http
    .delete<User>(`${environment.API_URL}/customers/${userid}`)
    .pipe(catchError(this.handleError));
  }
  handleError(error: { message: any; }):Observable<never>{
    let errorMessage = 'Erro Desconhecido';
    if(error){
      errorMessage = `Error: ${error.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
