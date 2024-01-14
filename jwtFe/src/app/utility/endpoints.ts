import {HttpHeaders} from "@angular/common/http";

const source: string = "http://localhost:8080";

export const tokenHeader = (jwtToken:string): HttpHeaders =>{
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(jwtToken)}`
    })
}
export const Endpoints: any ={
  BASE_URL: "http://localhost:4200",
  LOGIN: source + "/api/v1/auth/authenticate",
  REGISTER: source + "/api/v1/auth/register",
  LOGOUT: source + "/api/v1/auth/logout",
  CREATE_ADVERT: source + "/api/v1/advert/create",
}
