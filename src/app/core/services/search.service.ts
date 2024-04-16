import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainTopic } from '../../shared/models/main-topic';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SearchObj {
  search_name: string | null;
  search_category: string | null;
  search_start_year: number | null;
  search_end_year: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchResults: BehaviorSubject<MainTopic[]> = new BehaviorSubject<MainTopic[]>([]);

  constructor(private http: HttpClient) { }

  search(search_obj: any) {
    return this.http.post<MainTopic[]>(`${environment.apiUrl}/search`, search_obj).subscribe({
      next: (results) => {
        this.searchResults.next(results);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}
