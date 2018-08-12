import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ServiceModule } from './core/services/services.module';
import { AuthModule } from './components/authentication/auth.module';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderComponent } from './components/order/order/order.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientComponent } from './components/client/client/client.component';
import { ClientEditComponent } from './components/client/client-edit/client-edit.component';
import { ClientNewComponent } from './components/client/client-new/client-new.component';
import { OrderNewComponent } from './components/order/order-new/order-new.component';
import { OrderEditComponent } from './components/order/order-edit/order-edit.component';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { ItemComponent } from './components/item/item/item.component';
import { ItemNewComponent } from './components/item/item-new/item-new.component';
import { ItemDetailsComponent } from './components/item/item-details/item-details.component';
import { AuthGuard } from './core/guards/authentication/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderListComponent,
    OrderComponent,
    ClientListComponent,
    ClientComponent,
    ClientEditComponent,
    ClientNewComponent,
    OrderNewComponent,
    OrderEditComponent,
    OrderDetailsComponent,
    ItemListComponent,
    ItemComponent,
    ItemNewComponent,
    ItemDetailsComponent,
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
    AuthModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
