import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../service/movies.service';
import { ShowsService } from '../service/shows.service';
import { OrdersService } from '../service/orders.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-carousel-slider',
  templateUrl: './carousel-slider.component.html',
  styleUrls: ['./carousel-slider.component.css']
})
export class CarouselSliderComponent implements OnInit {
  movie: object;
  movieId: string;
  movieShowsSchedule: any;
  selectedShowId: string="";
  selectedMovie: string="";
  movieHourList: any;
  selectedDate: string="";
  numberOfTickets: number = 1;
  showObject: any;
  selectedShow: any;
  movieSearch: string="";
  public movieList: Observable<any[]>;

  constructor(private route: ActivatedRoute,private moviesService: MoviesService, private router: Router, private ordersService: OrdersService, private showsService: ShowsService) { }

  public movies: Observable<any[]>;

  ngOnInit() {
    this.movies = this.moviesService.getTop3();
    this.movieList = this.moviesService.getMovies();
  }

  getMovie() {
    this.moviesService.getMovieDetails(this.movieId).subscribe(res => {
    this.movie = res;
    }, err => {
      alert("Failed to get the movie");
      });
  }

  getMovieSchedule() {
    this.showsService.getMovieTime(this.movieId).subscribe(res => {
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
    this.showsService.getShowDetails(showId).subscribe(show => {
      this.ordersService.updateChoosenShow(show);
      this.router.navigate(['/orderseats']);
    });
  }

  onChangeMovie() {
    this.selectedDate="";
    this.selectedShowId="";
    this.movieHourList = [];

    this.movieShowsSchedule = this.showsService.getMovieTime(this.selectedMovie);
  }

  onChangeDate() {
    this.selectedShowId="";
    this.movieHourList = [];

    this.movieShowsSchedule.subscribe(showsScheduleArray => {
      showsScheduleArray.forEach(schedule => {
        if(schedule[this.selectedDate]){
          this.movieHourList=schedule[this.selectedDate];
        }
      }); 
    }
    );
  }

  onChangeSelectTime(){
    this.showsService.getShowDetails(this.selectedShowId).subscribe(show =>{
      this.selectedShow = show;
    });
  }

  quickOrderClick(){
    if (this.selectedMovie !== "" && this.selectedDate !== "" && this.selectedShowId !== "") {
      this.ordersService.updateChoosenShow(this.selectedShow);
      this.router.navigate(['/orderseats']);
    } else {
      alert('Failed');
    }
  }

}
