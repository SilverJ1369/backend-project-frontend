import { EventDate } from './event-date';
import { Location } from './location';
import { MainTopic } from './main-topic';

export class TimelineEvent {

  constructor(
    public id: number,
    public name: string,
    public details: string,
    public location: Location,
    public main_topic: MainTopic,
    public event_date: EventDate,
    public isGraphic: boolean
  ) {}
}
