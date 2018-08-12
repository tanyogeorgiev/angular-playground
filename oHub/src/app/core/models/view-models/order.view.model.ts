import { ClientInputModel } from "../input-models/client.input.model";
import { ItemInputModel } from "../input-models/item.input.model";

export class OrderViewModel {
  constructor(
    public id: number,
    public orderNumber: string,
    public orderDate: number,
    public client: ClientInputModel,
    public items: ItemInputModel[],
    public creator: string,
  ) { }
}