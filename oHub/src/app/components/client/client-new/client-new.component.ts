import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../core/services/clients/clients.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientInputModel } from '../../../core/models/input-models/client.input.model';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit {
  bindingModel: ClientInputModel
  constructor(
    private clientService: ClientsService,
    private router: Router,
    private toastr: ToastrService) {
    this.bindingModel = new ClientInputModel('', '', '', '', '', 1, '');
  }

  ngOnInit() {
  }
  onSubmit() {
    this.clientService
      .createClient(this.bindingModel)
      .subscribe(() => {
        this.router.navigate(['/'])
        this.toastr.success('Client created!', 'Success!')
      })

  }

}
