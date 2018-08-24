import { Component, OnInit } from '@angular/core';
import { ItemInputModel } from '../../../core/models/input-models/item.input.model';
import { ItemsService } from '../../../core/services/items/items.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})

export class ItemListComponent implements OnInit {

  offset = 2;
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  itemsViewModel: ItemInputModel[];

  constructor(
    private items: ItemsService
  ) { }

  ngOnInit() {
    this.nextKey = '';
    this.prevKeys = [];
    this.items.valueChanged$.subscribe((data: ItemInputModel[]) => {

      this.itemsViewModel = data.slice(0, this.offset)
      this.nextKey = data[data.length - 1].id
      if (data.length < this.offset) {
        this.nextKey = ''
      }

    })
    this.getItems('')

  }


  nextPage() {
    this.prevKeys.push(this.itemsViewModel[0].id) // set current key as pointer for previous page
    this.getItems(this.nextKey)

  }

  prevPage() {
   // console.log(this.prevKeys)
    const prevKey = this.prevKeys[this.prevKeys.length - 1] // use last key in array
    this.prevKeys.pop()   // then remove the last key in the array
  //  console.log(this.prevKeys)
    this.getItems(prevKey)
  }

  private getItems(key?) {
    this.items.getAllItem(key, this.offset)

  }
  //this.items.getAllItem()

  // this.items.getAllItem()
  //   .subscribe((data) => {
  //     console.log('items from component: ' + JSON.stringify(data))
  //     this.itemsViewModel = data
  //     console.log('FU*CKING component item-list: ' + JSON.stringify(this.itemsViewModel))
  //   })
}



