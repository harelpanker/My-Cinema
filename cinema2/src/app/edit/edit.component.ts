import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public movie: object;
  public movieId: string;

  constructor(private route: ActivatedRoute, private router: Router, private moviesService: MoviesService) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get("id");
    this.showMovieDetailes();
  }

  showMovieDetailes(){
    this.moviesService.getMovieDetails(this.movieId).subscribe(res => {
      this.movie = res;
      }, err => {
        alert("we fail to load movies");
        });
      }

  editMovie(){
    this.moviesService.editMovie(this.movie).subscribe(res => {
      this.router.navigate(['/login','newMovie']);
      }, err => {
          alert("we fail to edit");
        });
      }

  deleteMovie(){
    this.moviesService.deleteMovie(this.movieId).subscribe(res => {
      this.router.navigate(['/login','newMovie']);
      },err => {
        alert("Fail to delete");
        });
  }
}
