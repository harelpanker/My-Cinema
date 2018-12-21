import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../service/theater.service';
import { MoviesService } from '../service/movies.service';
import { ShowsService } from '../service/shows.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-new',
  templateUrl: './show-new.component.html',
  styleUrls: ['./show-new.component.css']
})
export class ShowNewComponent implements OnInit {
  public newShow = {};
  public movieList: Observable<any[]>;
  public theaterList: Observable<any[]>;
  public date;
  public time;

  constructor(private TheaterService: TheaterService, private moviesService: MoviesService, private ShowsService: ShowsService) { }

  ngOnInit() {
    this.movieList = this.moviesService.getMovies();
    this.theaterList = this.TheaterService.getTheater();
  }

  createShow() {
      this.newShow["dateTime"] = new Date(this.date + ' ' + this.time );
      this.ShowsService.createShow(this.newShow).subscribe(res => {
      alert('Show added successfully!');
    }, err => {
      alert("Failed to creat show");
    });
  }
  
}
