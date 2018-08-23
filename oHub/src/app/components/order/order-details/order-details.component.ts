import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/orders/order.service';
import { OrderInputModel } from '../../../core/models/input-models/order.input.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  bindingModel: OrderInputModel
  orderId: string
  constructor(private orderService: OrderService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.orderId = params['id'];
      this.orderService.getById(this.orderId)
        .subscribe((data) => {
          this.bindingModel = data
        })
    })
  }
}
