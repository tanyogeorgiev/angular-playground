import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../../core/models/input-models/user.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../core/services/authentication/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/authentication/auth.service';
import { UserRole } from '../../../../core/models/input-models/user-role.model';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  userModel: any
  userId: string = ''
  adminRole: UserRole = new UserRole(false, false);
  roleKeys: string[]
  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.adminRole)
    this.activatedRouter.params.subscribe((params) => {
      this.userId = params['id'];
      if (!this.userId) this.userId = this.authService.getCurrentUserUid()
      this.userService.getuserInformation(this.userId).subscribe((data) => {
      //  console.log('oninit with user Information: ' + JSON.stringify(data))
        this.userModel = data
      //  console.log(this.userModel)
        if (!this.userModel) {
          this.userModel = new UserModel('', '', '', '', '', '', new UserRole(false, true))
        }

        // let roles = []
        // const currentRoles = this.userModel['roles']
        // for (let role in currentRoles) {
        //   if (currentRoles[role]) {
        //     roles.push(role)
        //   }
        // }
        //this.userModel.roles = roles.length === 0 ? ['N/A'] : roles

        if (!Object.values(this.userModel.roles).some(role => role === true)) {
          this.userModel.roles = { name: 'N/A', active: true }
        }
        this.userModel.id = this.userId
        this.roleKeys = Object.keys(this.userModel.roles)
      }, err => {
        this.router.navigate(['/auth/login']);
      })
    })


  }

  onSubmit() {
    if (this.authService.isAdmin() && this.userModel.id !== this.authService.getCurrentUserUid) {
      this.userService.updateAdminUserInformation(this.userModel)
        .then((res) => {
          this.router.navigate(['/'])
          this.toastr.success('Profile was updated!', 'Success!')
        })
    }
    else {
      this.userService.updateUserInformation(this.userModel)
        .then((res) => {
          this.router.navigate(['/'])
          this.toastr.success('Profile was updated!', 'Success!')
        })
    }

  }
}
