import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../core/services/clients/clients.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  clientModel: any;
  clientId: string
  constructor(
    private clientService: ClientsService,
    private actiovatedRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.actiovatedRouter.params.subscribe((params) => {
      this.clientId = params['id'];

      this.clientService.getById(this.clientId)
        .subscribe((data) => {
          this.clientModel = data
        })
    })
  }


  onSubmit() {
    let currentId = this.clientId;
    const body = {
      [this.clientId]:
      {
        'name': this.clientModel.name,
        'country': this.clientModel.country,
        'city': this.clientModel.city,
        'address': this.clientModel.address,
        'bulstat': this.clientModel.bulstat,
        'iban': this.clientModel.iban

      }
    }
    this.clientService
      .editClient(body)
      .subscribe(() => {
        this.router.navigate(['/clients/list'])
        this.toastr.success('You made some great thing, change something!', 'Success!')
      })

  }


}
