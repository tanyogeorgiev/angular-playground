import { Injectable } from "@angular/core";
import { LoginInputModel } from "../../models/input-models/login.input.model";
import { HttpClientService } from "../http-client.service";
import { Router } from "@angular/router";

import * as firebase from 'firebase';
import { RegisterInputModel } from "../../models/input-models/register.input.model";
import { ToastrService } from "../../../../../node_modules/ngx-toastr";
import { UserModel } from "../../models/input-models/user.model";

import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";
import { UserRole } from "../../models/input-models/user-role.model";

@Injectable()
export class AuthService {
  public redirectUrl: string;
  public token: string;
  public user: UserModel



  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,

  ) {
    this.user = new UserModel('', '', '', '', '', '', new UserRole({}))

  }

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
            this.setRoles();
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
        this.router.navigate(['/auth/login']);
      });
  }

  logout(): void {

    firebase.auth().signOut();
    localStorage.clear()
    this.token = null;
    this.user = new UserModel('', '', '', '', '', '', new UserRole({}));
    this.router.navigate([""])
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
    // console.log(this.isAdmin())
    this.token = localStorage.getItem('token')
    return this.token != null;
  }

  isAdmin(): boolean {
    let isCurrentUserIsAdmin = false
    let currentUserAdminRole = localStorage.getItem('adminRole')
    if (currentUserAdminRole) {
      isCurrentUserIsAdmin = true;
    }
    else {
      isCurrentUserIsAdmin = this.user.roles.hasOwnProperty('admin') && this.user.roles['admin']
      if (isCurrentUserIsAdmin) {
        localStorage.setItem('adminRole', 'true')
      }
    }


    return isCurrentUserIsAdmin;
  }
  setRoles() {
    let userId = firebase.auth().currentUser.uid

    if (userId) {
      this.userService.getRolesByUserId(userId, this.token)
        .subscribe((data) => {
          let dataRoles = data['roles']
          const userRoles: UserRole = data['roles']
          this.user.roles = userRoles
          console.log(this.user)
        })
    }
  }
  getCurrentUserUid() {
    return firebase.auth().currentUser.uid
  }
  tryNavigate() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.router.navigate([""]);
    }
  }
}