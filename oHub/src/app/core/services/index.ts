import { AuthService } from './authentication/auth.service';
import { HttpClientService } from './http-client.service';
import { ClientsService } from './clients/clients.service';
import { ItemsService } from './items/items.service';
import { OrderService } from './orders/order.service';
import { UtilsService } from './utils.service';

export const allServices = [
  AuthService, ,
  ClientsService,
  ItemsService,
  OrderService,
  UtilsService,
  HttpClientService
]