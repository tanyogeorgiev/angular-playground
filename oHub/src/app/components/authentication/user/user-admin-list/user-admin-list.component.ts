import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../../core/models/input-models/user.model';
import { UserService } from '../../../../core/services/authentication/user.service';

@Component({
  selector: 'app-user-admin-list',
  templateUrl: './user-admin-list.component.html',
  styleUrls: ['./user-admin-list.component.css']
})
export class UserAdminListComponent implements OnInit {
  usersModel: UserModel[];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAllUsers()
      .subscribe((data: UserModel[]) => {
       // console.log(data)
        this.usersModel = data
      })
  }

}
