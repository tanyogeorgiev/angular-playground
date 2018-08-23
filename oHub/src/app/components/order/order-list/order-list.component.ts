import { Component, OnInit } from '@angular/core';
import { OrderInputModel } from '../../../core/models/input-models/order.input.model';
import { OrderService } from '../../../core/services/orders/order.service';
import { AuthService } from '../../../core/services/authentication/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  ordersViewModel: OrderInputModel[]
  constructor(
    private orderService: OrderService,

  ) { }

  ngOnInit() {
    this.orderService.getAllOrders()
      .subscribe((data) => {
        this.ordersViewModel = data
        console.log('what the fuck' + JSON.stringify(this.ordersViewModel))
      })
  }

}


