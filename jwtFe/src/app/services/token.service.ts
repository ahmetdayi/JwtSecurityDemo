import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {jwtDecode} from "jwt-decode";
import {catchError, firstValueFrom, map, Observable, of} from "rxjs";
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

  public tokenHeader = async (): Promise<HttpHeaders> => {

    let jwtToken: string = localStorage.getItem("jwtToken")
    const decodeTokenExp: number = jwtDecode(jwtToken).exp;
    const currentTime: number = Date.now() / 1000;
    const isExpired: boolean = decodeTokenExp < currentTime

    if (!isExpired) {
      jwtToken = localStorage.getItem("jwtToken")
      return new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    } else {
      //TODO bu methodu beklemek gerekiyor sonra localstorage dememe lazim
      await this.getJwtTokenByRefreshToken()
      jwtToken = localStorage.getItem("jwtToken")
      return new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    }

  }

  //TODO await yaparak ilk basta tokeni almasini sonra devam etmesini sagladik
  //TODO toPromise kalktigindan dolayi eger tek item degil de array donuyorsa observabl;e olarak kaliyor html de async yaziyoruz yazdirirken

   public async getJwtTokenByRefreshToken() {
    let promise =await firstValueFrom(this.refreshToken());
     console.log(promise)
     localStorage.setItem("jwtToken", promise["access_token"]);
     localStorage.setItem("refreshToken", promise["refresh_token"]);
     // let [response] = await Promise.all([this.refreshToken().subscribe({
     //   next: value => {
     //     localStorage.setItem("jwtToken", value["access_token"]);
     //     localStorage.setItem("refreshToken", value["refresh_token"]);
     //   }, error: err => {
     //     console.log(err)
     //   }
     // })])
     // console.log(response)
     return {accessToken: localStorage.getItem("access_token"), refreshToken: localStorage.getItem("refresh_token")}
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

