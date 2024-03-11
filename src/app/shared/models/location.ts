export class Location {

  constructor(
    public id: number,
    public locationKey: string,
    public country: string,
    public state?: string,
    public city?: string
  ) {}
}
