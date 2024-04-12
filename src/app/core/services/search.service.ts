import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainTopic } from '../../shared/models/main-topic';

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

  constructor(private http: HttpClient) { }

  search(search_obj: any) {
    console.log('searching for:', search_obj);

    return this.http.post<MainTopic[]>('http://localhost:3000/search', search_obj);
  }
}
