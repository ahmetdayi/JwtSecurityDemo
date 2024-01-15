import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CreateAdvertRequest} from "../../models/createAdvertRequest";
import {RegisterRequest} from "../../models/registerRequest";
import {AuthService} from "../../services/auth.service";
import {RegisterResponse} from "../../models/registerResponse";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  form: FormGroup;
  registerRequest: RegisterRequest;
  registerResponse:RegisterResponse

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toaster:ToastrService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required]],
      role: [''],
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.registerRequest = this.form.value
      console.log(this.form.value)
      console.log(this.form.value.name)
      this.register(this.registerRequest)

    } else {
      this.form.markAllAsTouched();
    }
  }

  register(registerRequest:RegisterRequest){
    this.authService.register(registerRequest).subscribe({
      next:value => {
        this.registerResponse = value;
        this.toaster.success("Successful registered","SUCCESSFUL!!")
        console.log(value)

      },error:err => {
        this.toaster.error("register failed","ERROR!!")
      }
    })
  }



}
