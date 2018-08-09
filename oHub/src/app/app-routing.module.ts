import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/guards/authentication/auth.guard';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { RegisterFormComponent } from './components/authentication/register-form/register.form.component';


const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes', children: [
      { path: '', component: HomeComponent },
      //  { path: 'new', component: RecipeCreateComponent },
      // { path: 'edit/:id', component: RecipeEditComponent },
      //  { path: 'detail/:id', component: RecipeDetailComponent},
      //  { path: 'list', component: RecipeListComponent }
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

