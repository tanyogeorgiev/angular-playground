import { Injectable } from "@angular/core";
import { LoginInputModel } from "../../models/input-models/login.input.model";
import { Router } from "@angular/router";

import * as firebase from 'firebase';

import { RegisterInputModel } from "../../models/input-models/register.input.model";
import { ToastrService } from "../../../../../node_modules/ngx-toastr";
import { UserModel } from "../../models/input-models/user.model";
import { UserService } from "./user.service";
import { UserRole } from "../../models/input-models/user-role.model";
import { IfStmt } from "@angular/compiler";

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
    if (!this.user) {
      localStorage.clear()

      this.userService.user = new UserModel('', 'Guest', '', '', '', '', new UserRole(false, true))
    }
    else {
      this.userService.setRoles()
    }

  }

  login(loginModel: LoginInputModel): Promise<void> {

    return firebase
      .auth()
      .signInWithEmailAndPassword(loginModel.email, loginModel.password)
      .then(() => {
        firebase.auth().currentUser
          .getIdToken()
          .then((token: string) => {
            this.token = token;
            localStorage.setItem('token', token);
            this.userService.setRoles();
          })
        this.toastr.success('Welcome back to the oHub! ', 'SUCCESS!!');
        this.router.navigate(['/']);

      })
      .catch(err => {
        localStorage.clear()
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
        this.login(registerModel).then(() => {
          let currentUserSettingsModel = new UserModel('', 'Guest', '', '', '', '', new UserRole(false, true))
          currentUserSettingsModel.id = firebase.auth().currentUser.uid
          this.userService.updateAdminUserInformation(currentUserSettingsModel)
          this.toastr.success('You are ready! Come and log in!', 'SUCCESS!!');
          this.router.navigate(['/auth/login']);
        })
      })
      .catch(err => {
        localStorage.clear()
        this.toastr.error(err.message, 'Warning!');
        this.router.navigate(['/auth/login']);
      });
  }

  logout(): void {

    firebase.auth().signOut();
    localStorage.clear()
    this.token = null;
    this.userService.user = new UserModel('', 'Guest', '', '', '', '', new UserRole(false, true));
    this.router.navigate([""])
  }

  getToken() {
    if (firebase.auth().currentUser) {
      firebase
        .auth().currentUser
        .getIdToken()
        .then((token: string) => {
          this.token = token;
        })
    }

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
      isCurrentUserIsAdmin = this.userService.user.roles.hasOwnProperty('admin') && this.userService.user.roles['admin']
      if (isCurrentUserIsAdmin) {
        localStorage.setItem('adminRole', 'true')
      }
    }


    return isCurrentUserIsAdmin;
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