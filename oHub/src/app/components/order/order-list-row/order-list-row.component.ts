import { Component, OnInit, Input } from '@angular/core';
import { OrderInputModel } from '../../../core/models/input-models/order.input.model';
import { AuthService } from '../../../core/services/authentication/auth.service';

@Component({
  selector: '[app-order-list-row]',
  templateUrl: './order-list-row.component.html',
  styleUrls: ['./order-list-row.component.css']
})
export class OrderListRowComponent implements OnInit {
  @Input('order') order: OrderInputModel
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
   // console.log(this.order)
  }

}
