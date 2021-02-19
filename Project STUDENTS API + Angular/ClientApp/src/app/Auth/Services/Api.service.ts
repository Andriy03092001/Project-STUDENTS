import { SingInModel } from '../Models/sign-in.model';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SignUpModel } from '../Models/sign-up.model';
import { ApiResponse } from 'src/app/Models/api.response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }
  loginStatus = new EventEmitter<boolean>();
  baseUrl = '/api/Account';

  SingIn(UserLoginDto: SingInModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/login', UserLoginDto);
  }

  SingUp(UserRegisterDto: SignUpModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/register', UserRegisterDto);
  }

  Logout() {
    this.loginStatus.emit(false);
    localStorage.removeItem('token');
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      if (decodedJwtData.roles === 'Admin') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      if (decodedJwtData.roles !== null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }



}
