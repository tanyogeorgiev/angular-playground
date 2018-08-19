import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';


import { authComponents } from './index';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';

@NgModule({
  declarations: [
    ...authComponents,
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthModule { }