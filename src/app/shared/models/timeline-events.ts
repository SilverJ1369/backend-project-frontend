import { EventDate } from './event-date';
import { Location } from './location';
import { MainTopic } from './main-topic';

export class TimelineEvents {

  constructor(
    public id: number,
    public name: string,
    public details: string,
    public location: Location,
    public mainTopic: MainTopic,
    public eventDate: EventDate,
    public isGraphic: boolean
  ) {}
}
