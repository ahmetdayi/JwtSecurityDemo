import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {Endpoints} from "../../utility/endpoints";

import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginRequest} from "../../models/loginRequest";
import {firstValueFrom, toArray} from "rxjs";

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
    private authService: AuthService,
    private toaster: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      this.loginRequest = this.form.value;
      console.log(this.form.value.username)

      await this.login();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private async login() {
    const response = await firstValueFrom(this.authService.login(this.loginRequest)).then(value => {
      this.toaster.success("Success Login", "Successful!!")
      localStorage.clear();
      localStorage.setItem("jwtToken", value["access_token"])
      localStorage.setItem("refreshToken", value["refresh_token"])
      this.router.navigate(["/"])
    })
  }

  //   localStorage.clear();
  //         localStorage.setItem("jwtToken", value["access_token"])
  //         localStorage.setItem("refreshToken", value["refresh_token"])
  //
  //         setTimeout(this.redirectToHome, 1700)

  redirectToHome = () => {
    window.location.href = Endpoints.BASE_URL; // Endpoints.HOME yerine direkt URL'yi belirtin
  };
  redirectToSignup = () => {
    window.location.href = Endpoints.BASE_URL + "/signup"; // Endpoints.HOME yerine direkt URL'yi belirtin
  };
}
