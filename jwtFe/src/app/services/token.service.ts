import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {jwtDecode} from "jwt-decode";
import {catchError, map, Observable, of} from "rxjs";
import {Endpoints} from "../utility/endpoints";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
              private toaster: ToastrService,
              private http:HttpService) {
  }
    public refreshToken(): Observable<any> {
        console.log()
        return this.http.POST<any>(Endpoints.REFRESH_TOKEN,{},new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem("refreshToken")}`
        }));
    }

  public tokenHeader = (): HttpHeaders => {

    let jwtToken: string =localStorage.getItem("jwtToken")
    const decodeTokenExp: number = jwtDecode(jwtToken).exp;
    const currentTime: number = Date.now() / 1000;
    const isExpired: boolean = decodeTokenExp < currentTime

    if (!isExpired) {
        jwtToken = localStorage.getItem("jwtToken")
      return new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    } else {
      this.getJwtTokenByRefreshToken()
        jwtToken = localStorage.getItem("jwtToken")
        return new HttpHeaders({
            'Authorization': `Bearer ${jwtToken}`
        })
    }

  }

   public getJwtTokenByRefreshToken() {
        this.refreshToken().subscribe({
           next:value => {
               localStorage.setItem("jwtToken", value["access_token"]);
               localStorage.setItem("refreshToken", value["refresh_token"]);
           },error:err => {
                console.log(err)
            }
       })
       return {accessToken:localStorage.getItem("access_token"),refreshToken:localStorage.getItem("refresh_token")}
  }

}
//.pipe(
//            map(response => {
//
//                localStorage.setItem("jwtToken", response["access_token"]);
//                localStorage.setItem("refreshToken", response["refresh_token"]);
//                return response;
//            }),
//            catchError(err => {
//                this.toaster.error("Not get new access token", "ERROR!!");
//                return of(false);
//            })
//        )
