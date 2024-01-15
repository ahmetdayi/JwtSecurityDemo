import {Component, OnInit} from '@angular/core';

import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {routes} from "../../app.routes";
import {AuthService} from "../../services/auth.service";
import {Endpoints} from "../../utility/endpoints";
import {ToastrService} from "ngx-toastr";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isAuthenticated : boolean
  isLoggedIn:boolean

  constructor(private authService: AuthService,
              private toaster:ToastrService,
              private router:Router) {

  }
  redirectLogin(){
    this.router.navigate(["/login"])
    // window.location.href = Endpoints.BASE_URL + "/login"
  }

  logout() {
    this.authService.logout().subscribe({
      next:value => {
        this.toaster.success("Logout","Successful!!")
      },error:err => {
        this.toaster.error("Logout","ERROR!!")
      }
    });
    this.router.navigate(["/login"]).then(value => {
      this.toaster.success("Please Login to do process","LOGOUT!!")
    })



  }

  ngOnInit(): void {
    //TODO behavioru dinledik
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }


}
