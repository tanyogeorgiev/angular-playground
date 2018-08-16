import { Component, OnInit, Input } from '@angular/core';
import { ClientInputModel } from '../../../core/models/input-models/client.input.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @Input('client') client: ClientInputModel;
  constructor() { }

  ngOnInit() {
  }

}
