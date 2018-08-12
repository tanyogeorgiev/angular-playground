export class ItemInputModel {
  constructor(
    public id: number,
    public name: string,
    public defaultPrice: number,
    public measureUnit: string,
    public description?: string,

  ) { }
}