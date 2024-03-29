import {Routes} from '@angular/router';

import {AdvertCreateFormComponent} from "./components/advert-create-form/advert-create-form.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomeComponent} from "./components/home/home.component";


export const routes: Routes = [
  {path: "createAdvert", component: AdvertCreateFormComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "home", component: HomeComponent},
];
