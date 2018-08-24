import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './components/authentication/auth.module';
import { ClientModule } from './components/client/client.module';
import { HomeComponent } from './components/home/home.component';
import { ItemModule } from './components/item/item.module';
import { OrderModule } from './components/order/order.module';
import { SharedModule } from './components/shared/shared.module';
import { AuthGuard } from './core/guards/authentication/auth.guard';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { ServiceModule } from './core/services/services.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    ServiceModule,
    AuthModule,
    NgSelectModule,
    ClientModule,
    ItemModule,
    OrderModule
  ],
  providers: [AuthGuard,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
    ]],

  bootstrap: [AppComponent]
})
export class AppModule { }
