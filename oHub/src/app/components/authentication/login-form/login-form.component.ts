import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { LoginInputModel } from '../../../core/models/input-models/login.input.model';

@Component({
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    const loginModel: LoginInputModel = {
      email: formData.value.email,
      password: formData.value.password
    }
    this.authService.login(loginModel)
    this.authService.tryNavigate();
  }
}