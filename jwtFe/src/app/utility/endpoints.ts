import {HttpHeaders} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";

const source: string = "http://localhost:8080";

export const Endpoints: any = {
  BASE_URL: "http://localhost:4200",
  LOGIN: source + "/api/v1/auth/authenticate",
  REGISTER: source + "/api/v1/auth/register",
  LOGOUT: source + "/api/v1/auth/logout",
  CREATE_ADVERT: source + "/api/v1/advert/create",
  REFRESH_TOKEN: source + "/api/v1/auth/refresh-token",
}
