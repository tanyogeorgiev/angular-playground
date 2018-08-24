import { ClientInputModel } from "./client.input.model";
import { ItemInputModel } from "./item.input.model";

export class OrderInputModel {
  constructor(
    public id: string,
    public number: string,
    public date: string,
    public client: ClientInputModel,
    public deliveryAddress: string,
    public items: ItemInputModel[],
    public creator: string
  ) { }
}