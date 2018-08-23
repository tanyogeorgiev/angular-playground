import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/guards/authentication/auth.guard';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { RegisterFormComponent } from './components/authentication/register-form/register.form.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientComponent } from './components/client/client/client.component';
import { ClientEditComponent } from './components/client/client-edit/client-edit.component';
import { ClientNewComponent } from './components/client/client-new/client-new.component';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { ItemNewComponent } from './components/item/item-new/item-new.component';
import { UserSettingsComponent } from './components/authentication/user/user-settings/user-settings.component';
import { UserAdminListComponent } from './components/authentication/user/user-admin-list/user-admin-list.component';
import { OrderNewComponent } from './components/order/order-new/order-new.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'orders', children: [
      { path: '', component: HomeComponent },
      { path: 'new', component: OrderNewComponent, canActivate: [AuthGuard] },
      // { path: 'edit/:id', component: RecipeEditComponent },
      { path: 'detail/:id', component: OrderDetailsComponent },
      { path: 'list', component: OrderListComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'clients', children: [
      { path: '', component: ClientListComponent },
      { path: 'new', component: ClientNewComponent },
      { path: 'edit/:id', component: ClientEditComponent },
      { path: 'detail/:id', component: ClientComponent },
      { path: 'list', component: ClientListComponent }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'items', children: [
      { path: '', component: ItemListComponent },
      { path: 'new', component: ItemNewComponent },
      // { path: 'edit/:id', component: ClientEditComponent },
      { path: 'list', component: ItemListComponent }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'auth', children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegisterFormComponent },
      { path: 'user/settings', component: UserSettingsComponent }

    ]
  },
  {
    path: 'admin', children: [
      { path: 'users/list', component: UserAdminListComponent },
      { path: 'users/settings/:id', component: UserSettingsComponent }
    ], canActivate: [AuthGuard]
  }


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

