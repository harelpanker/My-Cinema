import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../service/movies.service';
import { OrdersService } from '../service/orders.service';
import { ShowsService } from '../service/shows.service';
import * as moment from 'moment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit {
  movie: object;
  movieId: string;
  movieShowsSchedule: any;
  movieHourList: any;
  selectedDate: string;
  numberOfTickets: Number = 1;
  showObject: any;
  newOrder: object = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private MoviesService: MoviesService,
    private ShowsService: ShowsService,
    private OrdersService: OrdersService
    ) { }

    ngOnInit() {
      this.movieId = this.route.snapshot.paramMap.get("id");
      this.getMovie();
      this.getMovieSchedule();
    }

    getMovie() {
      this.MoviesService.getMovieDetails(this.movieId).subscribe(res => {
      this.movie = res;
      }, err => {
        alert("Failed to get the movie");
        });
    }

    getMovieSchedule() {
      this.ShowsService.getMovieTime(this.movieId).subscribe(res => {
        this.movieShowsSchedule = res;
        if (!this.movieHourList) {
          let firstDayInSchedule = Object.keys(this.movieShowsSchedule[0])[0];
          if (firstDayInSchedule) {
            this.showHours(firstDayInSchedule);
          }
        }
      }, err => {
        alert("We did not get the movie schedule");
      });
    }

    showHours(date) {
      this.selectedDate = date;
      this.movieShowsSchedule.forEach(schedule => {
        if (schedule[date]) {
          this.movieHourList = schedule[date];
        }
      });
    }

    getDateKey(obj) {
      return [Object.keys(obj)[0], moment(Object.keys(obj)[0]).format('DD/MM/YYYY')];
    }

    getTimeKey(obj) {
      return [Object.keys(obj)[0], obj[Object.keys(obj)[0]]];
    }

    chooseSeats(showId) {
      this.ShowsService.getShowDetails(showId).subscribe(show => {
        this.OrdersService.updateChoosenShow(show);
        this.router.navigate(['/orderseats']);
      });
    }
}
