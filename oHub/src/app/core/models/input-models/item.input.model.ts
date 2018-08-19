export class ItemInputModel {
  constructor(
    public id: string,
    public name: string,
    public defaultPrice: number,
    public measureUnit: string,
    public description?: string,

  ) { }
}