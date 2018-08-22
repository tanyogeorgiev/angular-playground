import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ClientInputModel } from '../../../core/models/input-models/client.input.model';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { ClientsService } from '../../../core/services/clients/clients.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: '[app-client-list-row]',
  templateUrl: './client-list-row.component.html',
  styleUrls: ['./client-list-row.component.css']
})
export class ClientListRowComponent implements OnInit {

  @Input('client') client: ClientInputModel;

  constructor(

    private clientService: ClientsService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }



  ngOnInit() {
  }

  onDeleteClient(id: string) {
    this.clientService.deleteClient(id)
      .subscribe(() => {
        this.toastr.success('There is no turning back... you destroy him...', 'SUCCESS!');

        this.router.navigated = false;

        this.router.navigate(['/clients/list']);
      })
  }


}
