import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { orderComponents } from '.';
import { RouterModule } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [
    ...orderComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgSelectModule
  ]
})
export class OrderModule { }