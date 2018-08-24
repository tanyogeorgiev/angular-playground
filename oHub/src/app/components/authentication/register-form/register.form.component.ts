import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterInputModel } from '../../../core/models/input-models/register.input.model';
import { AuthService } from '../../../core/services/authentication/auth.service';

@Component({
  templateUrl: './register.form.component.html'
})
export class RegisterFormComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    //  console.log(this)
  }

  onSubmit(formData: NgForm) {
    // console.log(formData.value)

    const registerModel: RegisterInputModel = {
      email: formData.value.email,
      password: formData.value.password
    }

    this.authService.register(registerModel);
  }
}