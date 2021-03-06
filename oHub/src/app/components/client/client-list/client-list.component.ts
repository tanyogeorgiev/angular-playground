import { Component, OnInit } from '@angular/core';
import { ClientInputModel } from '../../../core/models/input-models/client.input.model';
import { ClientsService } from '../../../core/services/clients/clients.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clientsViewModel: ClientInputModel[];
  constructor(
    private clients: ClientsService
  ) { }

  ngOnInit() {
    this.clients.getAllClient()
      .subscribe((data) => {

        this.clientsViewModel = data
      })
  }

}
