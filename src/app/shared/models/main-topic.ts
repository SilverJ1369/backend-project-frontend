import { Location } from './location';
import { Category } from './category';
import { EventDate } from './event-date';

export class MainTopic {

  constructor(
    public id: number,
    public location: Location,
    public category: Category,
    public startDate: EventDate,
    public endDate: EventDate
  ) {}
}
