import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';


import { authComponents } from './index';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { UserAdminSettingsComponent } from './user/user-admin-settings/user-admin-settings/user-admin-settings.component';
import { UserAdminListComponent } from './user/user-admin-list/user-admin-list.component';
import { UserAdminListRowComponent } from './user/user-admin-list-row/user-admin-list-row.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    ...authComponents,
    UserSettingsComponent,
    UserAdminSettingsComponent,
    UserAdminListComponent,
    UserAdminListRowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AuthModule { }