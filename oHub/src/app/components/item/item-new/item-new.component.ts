import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../../core/services/items/items.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemInputModel } from '../../../core/models/input-models/item.input.model';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.css']
})
export class ItemNewComponent implements OnInit {
  bindingModel: ItemInputModel
  constructor(
    private itemService: ItemsService,
    private router: Router,
    private toastr: ToastrService) {

    this.bindingModel = new ItemInputModel('', '', null, '', '')
  }

  ngOnInit() {
  }

  onSubmit() {
    this.itemService
      .createItem(this.bindingModel)
      .subscribe(() => {
        this.router.navigate(['/items/list'])
        this.toastr.success('Item was created!', 'Success!')
      })

  }

}
