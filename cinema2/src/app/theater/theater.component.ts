import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../service/theater.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {

  public theaters: Observable<any[]>;

  constructor(private TheaterService: TheaterService) {
   
  }
  
  ngOnInit() {
    this.theaters = this.TheaterService.getTheater();
  }

}
