import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../service/shows.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {
  public showId: string;
  public shows: Observable<any[]>;

  constructor(private showsService: ShowsService, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    this.shows = this.showsService.getShows();
    this.showId = this.route.snapshot.paramMap.get("id");
  }

  deleteShow(){
    this.showsService.deleteShow(this.showId).subscribe(res => {
      this.router.navigate(['/shows']);
    },err => {
      console.log(err);
      alert('Fail to delete');
      });
  }

}
