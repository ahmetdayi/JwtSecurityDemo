import { Injectable } from '@angular/core';
import {LoginRequest} from "../models/loginRequest";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginResponse} from "../models/loginResponse";
import {Endpoints} from "../utility/endpoints";
import {Router} from "@angular/router";
import {HttpService} from "./http.service";
import {RegisterRequest} from "../models/registerRequest";
import {RegisterResponse} from "../models/registerResponse";
import {HttpHeaders} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //TODO login ve logout edildiginde nav barin degismesi icin BehaviorSubject olusturulup ona kaydolundu
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  //TODO loggedIn$ kullanilarakta bu deger degistirildiginde bunu izleyen ogelerinde degismesi saglandi 28 ve 37.satir
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private http: HttpService,
    private tokenService: TokenService
  ) { }
  public login(request: LoginRequest): Observable<LoginResponse> {
    this.loggedInSubject.next(true);
    return this.http.POST<LoginResponse>(Endpoints.LOGIN, request);
  }
  public register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.POST<RegisterResponse>(Endpoints.REGISTER, request);
  }

  public logout():Observable<any> {
    localStorage.clear();
    this.loggedInSubject.next(false);
    return this.http.POST<any>(Endpoints.LOGOUT,{});
  }

  isAuthenticated() {
    const token = localStorage.getItem("jwtToken")

    if (token != null ){
        const isExpired = jwtDecode(token).exp<(Date.now()/1000)
      if (isExpired){
          const response = this.tokenService.getJwtTokenByRefreshToken()

          return true
      }else {
        return true
      }

    }
    else if(token == null){
      return false
    }
    return true;


  }

}
