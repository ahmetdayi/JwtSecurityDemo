import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {Endpoints} from "../../utility/endpoints";

import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginRequest} from "../../models/loginRequest";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginRequest: LoginRequest;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService:AuthService,
    private toaster:ToastrService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loginRequest = this.form.value;
      console.log(this.form.value.username)

      this.login();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private login() {
    this.authService.login(this.loginRequest).subscribe({
      next:value => {
        localStorage.clear();
        localStorage.setItem("jwtToken", value["accessToken"])
        localStorage.setItem("refreshToken", value["refreshToken"])
        this.toaster.success("Success Login","Successful!!")
        setTimeout(this.redirectToHome, 1700)
      },error:err => {
        this.toaster.error("Cannot Login","Error!!")
      }
    })
  }


  redirectToHome = () => {
    window.location.href = Endpoints.BASE_URL; // Endpoints.HOME yerine direkt URL'yi belirtin
  };
}
