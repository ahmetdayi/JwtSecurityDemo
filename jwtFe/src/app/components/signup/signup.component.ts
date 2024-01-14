import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form: FormGroup;
  createAdvertRequest: CreateChildRequest;

  constructor(
    private formBuilder: FormBuilder,
    private childService: ChildService,
    private router: Router,
    private toaster:ToastrService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      inviteCode: [''],
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.createChildRequest = {inviteCodeList:[this.form.value["inviteCode"]],...this.form.value}
      console.log(this.form.value)
      console.log(this.form.value.name)
      this.createParent(this.createChildRequest)

    } else {
      this.form.markAllAsTouched();
    }
  }



}
