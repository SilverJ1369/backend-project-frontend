export class EventDate {

  constructor(
    public id: number,
    public dateKey: string,
    public year: number,
    public month: number,
    public day: number,
    public isAD: boolean,
    public modifier: string
  ) {}
}
