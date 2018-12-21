import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { MoviesService } from '../service/movies.service';
import { TheaterService } from '../service/theater.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})

export class NewMovieComponent implements OnInit {
  public movies: Observable<any[]>;
  public newMovie: any = {};

    constructor(private moviesService: MoviesService, private TheaterService: TheaterService) {
    }
    createMovie() {
      this.moviesService.createMovie(this.newMovie).subscribe(res => {
      this.newMovie = {};
      
        alert("Movie created successfully");
      }, err => {
        alert("Error in creating movie");
      });
    }
    
    ngOnInit() {
      this.movies = this.moviesService.getMovies();
    }

}
