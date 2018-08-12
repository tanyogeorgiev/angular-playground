import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/guards/authentication/auth.guard';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { RegisterFormComponent } from './components/authentication/register-form/register.form.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientComponent } from './components/client/client/client.component';
import { ClientEditComponent } from './components/client/client-edit/client-edit.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'orders', children: [
      { path: '', component: HomeComponent },
      //  { path: 'new', component: RecipeCreateComponent },
      // { path: 'edit/:id', component: RecipeEditComponent },
      //  { path: 'detail/:id', component: RecipeDetailComponent},
      //  { path: 'list', component: RecipeListComponent }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'clients', children: [
      { path: '', component: ClientListComponent },
      { path: 'new', component: ClientComponent },
      { path: 'edit/:id', component: ClientEditComponent },
      // { path: 'detail/:id', component: RecipeDetailComponent},
      { path: 'list', component: ClientListComponent }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'auth', children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegisterFormComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

