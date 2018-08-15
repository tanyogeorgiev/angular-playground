import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  dropdownLi: string = "show" //"nav-item dropdown";
  dropdownMenu: string = "show" //"dropdown-menu";
  tagid: any = 0
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  expand(id: any) {
    console.log(id)
    if (this.tagid === id) {
      this.tagid = 0
      return
    }
    this.tagid = id

    // this.dropdownLi.endsWith('show')
    //   ? this.dropdownLi = "nav-item dropdown"
    //   : this.dropdownLi = "nav-item dropdown show";
    //
    // this.dropdownMenu.endsWith('show')
    //   ? this.dropdownMenu = "dropdown-menu"
    //   : this.dropdownMenu = "dropdown-menu show";
  }

  Logout() {
    this.authService.logout()

  }
}