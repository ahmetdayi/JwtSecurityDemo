import {Component, OnInit} from '@angular/core';

import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
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

  constructor(private authService: AuthService,
              private toaster:ToastrService) {
  }
  redirectLogin(){
    window.location.href = Endpoints.BASE_URL + "/login"
  }

  logout() {
    this.authService.logout().subscribe({
      next:value => {
        this.toaster.success("Logout","Successful!!")
      },error:err => {
        this.toaster.error("Logout","ERROR!!")
      }
    });
    this.redirectLogin();
    this.toaster.success("Logout","Successful!!")
    this.isAuthenticated = false

  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated()
  }


}
