import { Injectable } from "@angular/core";
import { LoginInputModel } from "../../models/input-models/login.input.model";
import { HttpClientService } from "../http-client.service";
import { Router } from "@angular/router";

import * as firebase from 'firebase';
import { RegisterInputModel } from "../../models/input-models/register.input.model";
import { ToastrService } from "../../../../../node_modules/ngx-toastr";

@Injectable()
export class AuthService {
  public redirectUrl: string;
  public token: string;


  constructor(
    private httpService: HttpClientService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  login(loginModel: LoginInputModel): void {
    firebase
      .auth()
      .signInWithEmailAndPassword(loginModel.email, loginModel.password)
      .then(() => {
        firebase.auth().currentUser
          .getIdToken()
          .then((token: string) => {
            this.token = token;
            localStorage.setItem('token', token);
          })

        this.toastr.success('Welcome back to the oHub! ', 'SUCCESS!!');
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.toastr.error(err.message, 'Warning!');
      });
  }

  register(registerModel: RegisterInputModel): void {

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registerModel.email,
        registerModel.password)
      .then(() => {
        this.toastr.success('You are ready! Come and log in!', 'SUCCESS!!');
        this.router.navigate(['/auth/login']);
      })
      .catch(err => {
        this.toastr.error(err.message, 'Warning!');
      });
  }

  logout(): void {
    firebase.auth().signOut();
    this.token = null;


    this.router.navigate([""]);
  }
  getToken() {
    firebase
      .auth().currentUser
      .getIdToken()
      .then((token: string) => {
        this.token = token;
      })

    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

  isAdmin(): boolean {
    return true;
  }

  tryNavigate() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.router.navigate([""]);
    }
  }
}