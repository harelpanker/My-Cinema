import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MoviesService {

  moviesUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) { }

  // Create a new movie
  createMovie(movie: any): Observable<any> {
    return this.http.post(this.moviesUrl, movie);
  }

  // Return the movies list
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.moviesUrl);
  }

  // Return the top 3 movies
  getTop3(): Observable<any[]> {
    return this.http.get<any[]>(this.moviesUrl + '/big3');
  }

  // Return 1 movie details
  getMovieDetails(movieId): Observable<any> {
    return this.http.get<any[]>(this.moviesUrl + '/' + movieId);
  }

  // edit
  editMovie(movie: any): Observable<any> {
    return this.http.put<any[]>(this.moviesUrl , movie);
  }

  // delete
  deleteMovie(movieId): Observable<any> {
    return this.http.delete(this.moviesUrl + '/' + movieId);
  }
}
