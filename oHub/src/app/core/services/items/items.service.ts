

import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; import { ItemInputModel } from '../../models/input-models/item.input.model';
const baseUrl = `https://ohubsystem.firebaseio.com/items/`;
import * as firebase from 'firebase';
import { Subject, pipe } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {


  valueChanged$ = new Subject();

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  createItem(body: ItemInputModel) {
    const token = this.authService.getToken();

    return this.http.post(`${baseUrl}.json?auth=${token}`, body);
  }

  getAll() {
    const token = this.authService.getToken();

    return this.http.get(`${baseUrl}.json?auth=${token}`)
      .pipe(map((res: Response) => {
        const items = Object.keys(res);
        const Items: ItemInputModel[] = [];
        for (let i of items) {
          Items.push(new ItemInputModel(i, res[i].name,
            res[i].defaultPrice, res[i].measureUnit, res[i].description));
        }
        //  console.log('item from service: ' + JSON.stringify(Items))
        return Items
      }))
  }


  getAllItem(key: string, offset: number) {
    const token = this.authService.getToken();
    let database = firebase.database();


    let res = database.ref('items').orderByKey().startAt(key).limitToFirst(offset + 1);
    res.on('value', snap => this.callback(snap.val()))

  }

  callback(val) {
    if (val) {
      const items = Object.keys(val);
      const Items: ItemInputModel[] = [];
      for (let i of items) {
        Items.push(new ItemInputModel(i, val[i].name,
          val[i].defaultPrice, val[i].measureUnit, val[i].description));
      }
      return this.valueChanged$.next(Items); // pass whatever you need to receive in the subscription
    }
  }

  getById(id: string) {
    return this.getByIdInternal(id)
  }


  editItem(body) {
    const token = this.authService.getToken();
    return this.http.patch(`${baseUrl}.json?auth=${token}`, body);
  }

  deleteItem(id: string) {
    const token = this.authService.getToken();

    return this.http.delete(`${baseUrl}${id}/.json?auth=${token}`)
  }

  private getByIdInternal(id: string) {
    const token = this.authService.getToken();

    return this.http.get(`${baseUrl}${id}/.json?auth=${token}`)
      .pipe(map((res: Response) => {

        return res
      }));

  }
}