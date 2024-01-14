import { Injectable } from '@angular/core';
import {LoginRequest} from "../models/loginRequest";
import {Observable} from "rxjs";
import {LoginResponse} from "../models/loginResponse";
import {Endpoints} from "../utility/endpoints";
import {Router} from "@angular/router";
import {HttpService} from "./http.service";
import {RegisterRequest} from "../models/registerRequest";
import {RegisterResponse} from "../models/registerResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpService,
    private router: Router
  ) { }
  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.POST<LoginResponse>(Endpoints.LOGIN, request);
  }
  public register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.POST<RegisterResponse>(Endpoints.REGISTER, request);
  }
  public logout():Observable<any> {
    localStorage.clear();
    return this.http.POST<any>(Endpoints.LOGOUT,{});
  }

  isAuthenticated() {
    return !!localStorage.getItem("jwtToken");
  }


}
