import { Component, OnInit, Input } from '@angular/core';
import { ClientInputModel } from '../../../core/models/input-models/client.input.model';
import { ClientsService } from '../../../core/services/clients/clients.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/authentication/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clientModel: any;
  constructor(
    private clients: ClientsService,
    private router: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      let id = params['id'];

      this.clients.getById(id)
        .subscribe((data) => {
          this.clientModel = data //new ClientInputModel(data['id'], data['name'], data['country'], data.['city'], data['address'], data['bulstat'], data['iban'])
          this.clientModel.id = id;
        })
    })
  }
}
