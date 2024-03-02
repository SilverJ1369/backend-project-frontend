import { MainTopic } from "./main-topic";

export class TimesuckEpisode {

  constructor(
    public id: number,
    public episodeNumber: string,
    public mainTopic: MainTopic
    ) {}
}
