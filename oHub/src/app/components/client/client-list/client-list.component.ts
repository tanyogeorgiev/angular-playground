import { Component, OnInit } from '@angular/core';
import { ClientInputModel } from '../../../core/models/input-models/client.input.model';
import { Observable } from 'rxjs';
import { ClientsService } from '../../../core/services/clients/clients.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients$: ClientInputModel[];
  constructor(
    private clients: ClientsService
  ) { }

  ngOnInit() {
    this.clients.getAllClient()
      .subscribe((data) => {
        console.log(data)
        this.clients$ = data
      })
  }

}
