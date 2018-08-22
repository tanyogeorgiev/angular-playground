import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../../../../core/models/input-models/user.model';
import { UserService } from '../../../../core/services/authentication/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/authentication/auth.service';

@Component({
  selector: '[app-user-admin-list-row]',
  templateUrl: './user-admin-list-row.component.html',
  styleUrls: ['./user-admin-list-row.component.css']
})
export class UserAdminListRowComponent implements OnInit {

  @Input('user') user: UserModel;
  constructor(
    private clientService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    //}
  }



  ngOnInit() {
  }
  onDeleteClient(id: string) {
    // this.userService.deleteUser(id)
    //   .subscribe(() => {
    //     this.toastr.success('There is no turning back... you destroy him...', 'SUCCESS!');

    //     this.router.navigated = false;

    //     this.router.navigate(['/clients/list']);
    //   })
  }
}
