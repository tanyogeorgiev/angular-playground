import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { clientComponents } from '.';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    ...clientComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ClientModule { }