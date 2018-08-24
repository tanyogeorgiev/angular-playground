import { Component, OnInit, Input } from '@angular/core';
import { ItemsService } from '../../../core/services/items/items.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ItemInputModel } from '../../../core/models/input-models/item.input.model';
import { AuthService } from '../../../core/services/authentication/auth.service';

@Component({
  selector: '[app-item-list-row]',
  templateUrl: './item-list-row.component.html',
  styleUrls: ['./item-list-row.component.css']
})
export class ItemListRowComponent implements OnInit {

  @Input('item') itemModel: ItemInputModel;

  constructor(
    private itemService: ItemsService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit() {
   // console.log('on init item-list-row: ' + JSON.stringify(this.itemModel))
  }

  onDeleteItem(id: string) {
    this.itemService.deleteItem(id)
      .subscribe(() => {
        this.toastr.success('There is no turning back... you destroy this ...', 'SUCCESS!');

        this.router.navigated = false;

        this.router.navigate(['/items/list']);
      })
  }

}
