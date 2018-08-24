import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OrderInputModel } from '../../models/input-models/order.input.model';
import { AbstractFormGroupDirective } from '@angular/forms';
import { UtilsService } from '../utils.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../authentication/auth.service';
import { map } from 'rxjs/operators';
import { ItemInputModel } from '../../models/input-models/item.input.model';

const baseUrl = `https://ohubsystem.firebaseio.com/orders/`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilService: UtilsService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  createOrUpdate(model: OrderInputModel) {
    let guid: string
    let token = localStorage.getItem('token')
    let userId = firebase.auth().currentUser.uid

    guid = model.id
    if (!guid) {
      guid = this.utilService.getGuid();
    }

    if (userId) {
      model.id = guid
      model.creator = userId
      let db = firebase.database()
      return db.ref('orders').child(guid).set({
        id: model.id,
        number: model.number,
        date: model.date,
        client: model.client,
        deliveryAddress: model.deliveryAddress,
        items: model.items,
        creator: userId
      })
    }
    else {
      this.toastr.error('Not Authorized! ', 'WARNING!!');
      this.router.navigate(['/auth/login']);

    }
  }

  getAllOrders() {

    const token = this.authService.getToken();

    return this.http.get(`${baseUrl}.json?auth=${token}`)
      .pipe(map((res: Response) => {
        const items = Object.keys(res);
        const Orders: OrderInputModel[] = [];
        for (let i of items) {
          Orders.push(new OrderInputModel(res[i].id, res[i].number, res[i].date,
            res[i].client, res[i].deliveryAddress, res[i].items, res[i].creator));
        }

        return Orders
      }));
  }

  getById(id: string) {
    const token = this.authService.getToken();

    return this.http.get(`${baseUrl}${id}/.json?auth=${token}`)
      .pipe(map((res: Response) => {
        let result = new OrderInputModel(res['id'], res['number'], res['date'],
          res['client'], res['deliveryAddress'], res['items'], res['creator'])
        return result
      }));
  }
}

