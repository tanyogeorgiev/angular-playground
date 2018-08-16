import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "../../services/authentication/auth.service";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService


  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkIfLogged(state.url);
  }

  checkIfLogged(url: string) {

    if (this.authService.isAuthenticated()) {

      return true;
    }

    this.authService.redirectUrl = url;
    this.toastr.error('You don\'t have authorization!', 'Warning!');
    this.router.navigate(["/auth/login"]);

    return false;
  }
}