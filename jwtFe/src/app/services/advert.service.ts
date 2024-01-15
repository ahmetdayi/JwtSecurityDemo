import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {CreateAdvertRequest} from "../models/createAdvertRequest";
import {Observable} from "rxjs";
import {CreateAdvertResponse} from "../models/createAdvertResponse";
import {Endpoints} from "../utility/endpoints";
import {TokenService} from "./token.service";
import {HttpHeaders} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(private http:HttpService,
              private tokenService:TokenService) { }

  public createAdvert(request:CreateAdvertRequest):Observable<CreateAdvertResponse>{

    return this.http.POST<CreateAdvertResponse>(Endpoints.CREATE_ADVERT,request,this.tokenService.tokenHeader());
  }
}
