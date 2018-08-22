import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClientInputModel } from '../../models/input-models/client.input.model';
const baseUrl = `https://ohubsystem.firebaseio.com/clients/`;

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private ClientsCached: boolean = false;
  constructor(
    private authService: AuthService,
    private http: HttpClient
    ,
  ) { }

  createClient(body: ClientInputModel) {
    const token = this.authService.getToken();

    return this.http.post(`${baseUrl}.json?auth=${token}`, body);
  }

  getAllClient() {
    const token = this.authService.getToken();

    return this.http.get(`${baseUrl}.json?auth=${token}`)
      .pipe(map((res: Response) => {
        const items = Object.keys(res);
        const Clients: ClientInputModel[] = [];
        for (let i of items) {
          Clients.push(new ClientInputModel(i, res[i].name,
            res[i].country, res[i].city, res[i].address, res[i].bulstat, res[i].iban));
        }
        this.ClientsCached = true;
        return Clients
      }));
  }

  getById(id: string) {
    return this.getByIdInternal(id)
  }


  editClient(body) {
    const token = this.authService.getToken();
    return this.http.patch(`${baseUrl}.json?auth=${token}`, body);
  }

  deleteClient(id: string) {
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
