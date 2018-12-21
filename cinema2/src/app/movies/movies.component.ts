import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../service/movies.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public movies: Observable<any[]>;

  constructor(private moviesService: MoviesService) {
    
  }
  ngOnInit() {
    this.movies = this.moviesService.getMovies();
  }

}
