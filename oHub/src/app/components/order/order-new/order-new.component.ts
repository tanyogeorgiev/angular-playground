import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientInputModel } from '../../../core/models/input-models/client.input.model';
import { ClientsService } from '../../../core/services/clients/clients.service';
import { OrderInputModel } from '../../../core/models/input-models/order.input.model';
import { ItemInputModel } from '../../../core/models/input-models/item.input.model';
import { ItemsService } from '../../../core/services/items/items.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../core/services/orders/order.service';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent implements OnInit {

  clients$: Observable<ClientInputModel[]>;
  items$: Observable<ItemInputModel[]>;
  item: ItemInputModel = new ItemInputModel('', '', 0, '', '')
  items: ItemInputModel[] = [this.getMewItem()]
  bindingModel: OrderInputModel = new OrderInputModel('', '', new Date().toDateString(),
    new ClientInputModel('', '', '', '', '', 0, ''),
    '', this.items, '')


  constructor(
    private clietnService: ClientsService,
    private orderService: OrderService,
    private itemService: ItemsService,
    private router: Router,
    private toastr: ToastrService

  ) { }

  ngOnInit() {

    this.clients$ = this.clietnService.getAllClient();
    this.items$ = this.itemService.getAll()
  }

  onSubmit() {
    console.log('SUBMITTED');
    this.orderService.createOrUpdate(this.bindingModel)
      .then((res) => {
        this.router.navigate(['/'])
        this.toastr.success('Your order is all set!', 'Success!')
      })
  }

  addItem() {
    this.bindingModel.items.push(this.getMewItem())
  }

  indexTracker(index: number, value: any) {
    return index;
  }
  onSelected($event, index: number) {

    const itemRowData = $event
    this.bindingModel.items[index].name = itemRowData.name
    this.bindingModel.items[index].defaultPrice = itemRowData.defaultPrice
    this.bindingModel.items[index].measureUnit = itemRowData.measureUnit
    this.bindingModel.items[index].id = itemRowData.id

  }
  onChangeClient($event) {
    const itemRowData = $event
    const client = new ClientInputModel(
      itemRowData.id,
      itemRowData.name,
      itemRowData.country,
      itemRowData.city,
      itemRowData.address,
      itemRowData.bulstat,
      itemRowData.iban
    )
    this.bindingModel.client = client
  }

  deleteItem(index: number) {
    if (this.bindingModel.items.length > 1) {
      this.bindingModel.items.splice(index, 1)
    }
  }

  private getMewItem(): ItemInputModel {
    return Object.create(this.item)
  }
}
