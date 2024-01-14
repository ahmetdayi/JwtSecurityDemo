import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {CreateAdvertRequest} from "../models/createAdvertRequest";
import {Observable} from "rxjs";
import {CreateAdvertResponse} from "../models/createAdvertResponse";
import {Endpoints} from "../utility/endpoints";

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(private http:HttpService) { }

  public createAdvert(request:CreateAdvertRequest):Observable<CreateAdvertResponse>{
    return this.http.POST<CreateAdvertResponse>(Endpoints.CREATE_ADVERT,request);
  }
}
