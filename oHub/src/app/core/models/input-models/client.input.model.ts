export class ClientInputModel {
  constructor(
    public id: string,
    public name: string,
    public country: string,
    public city: string,
    public address: string,
    public bulstat: number,
    public iban: string
  ) { }
}