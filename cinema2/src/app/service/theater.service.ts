import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TheaterService {

  theaterUrl = 'http://localhost:3000/theaters';

  constructor(private http: HttpClient) { }
  // Create a new theater
  createTheater(theater: any): Observable<any> {
    return this.http.post(this.theaterUrl, theater);
  }

  // Return the theater list
  getTheater(): Observable<any[]> {
    return this.http.get<any[]>(this.theaterUrl);
  }

  // Return 1 theater details
  getTheaterDetails(theaterId): Observable<any> {
    return this.http.get<any[]>(this.theaterUrl + '/' + theaterId);
  }

  //edit
  editTheater(theaterId, theater: any): Observable<any> {
    return this.http.put<any[]>(this.theaterUrl, theater);
  }

  //delete
  deleteTheater(theaterId): Observable<any> {
    return this.http.delete(this.theaterUrl + '/' + theaterId);
  }

}
