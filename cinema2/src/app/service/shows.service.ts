import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ShowsService {

  showsUrl = 'http://localhost:3000/shows';

  constructor(private http: HttpClient) { }

  // Create a new show
  createShow(show: any): Observable<any> {
    return this.http.post(this.showsUrl, show);
  }

  // Return the shows list
  getShows(): Observable<any[]> {
    return this.http.get<any[]>(this.showsUrl);
  }

  // Return the show details
  getShowDetails(showId): Observable<any> {
    return this.http.get<any[]>(this.showsUrl + '/' + showId);
  }

  // Return the Show details width
  getMovieTime(movieId): Observable<any> {
    return this.http.get<any[]>(this.showsUrl + '/schedule/' + movieId);
  }

  // edit
  editShow(show: any): Observable<any> {
    return this.http.put<any[]>(this.showsUrl , show);
  }

  // delete
  deleteShow(showId): Observable<any> {
    return this.http.delete(this.showsUrl + '/' + showId);
  }
}
