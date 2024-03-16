import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TimesuckEpisode } from '../../shared/models/timesuck-episode';

@Injectable({
  providedIn: 'root'
})
export class TimesuckEpisodeService {

  constructor(private http: HttpClient) { }

  getTimesuckEpisodes() {
    return this.http.get(`${environment.apiUrl}/timesuck_episodes`);
  }

  createTimesuckEpisode(data: any): Observable<TimesuckEpisode> {
    return this.http.post<TimesuckEpisode>(`${environment.apiUrl}/timesuck_episodes`, data);
  }

  updateTimesuckEpisode(data: TimesuckEpisode) {
    return this.http.put(`${environment.apiUrl}/timesuck_episodes`, data);
  }

  deleteTimesuckEpisode(data: TimesuckEpisode) {
    return this.http.delete(`${environment.apiUrl}/timesuck_episodes/${data.id}`);
  }
}
