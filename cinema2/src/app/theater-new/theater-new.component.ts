import { Component, OnInit } from '@angular/core';
import { TheaterService } from '../service/theater.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theater-new',
  templateUrl: './theater-new.component.html',
  styleUrls: ['./theater-new.component.css']
})
export class TheaterNewComponent implements OnInit {
  public theater: Observable<any[]>;
  public newTheater: any = {};

  constructor(private TheaterService: TheaterService) {
    this.theater = this.TheaterService.getTheater();
  }
  createTheater() {
    this.TheaterService.createTheater(this.newTheater).subscribe(res => {
    this.newTheater = {};
    
    this.theater = this.TheaterService.getTheater();
      alert("Theater created successfully");
    }, err => {
      alert("Error in creating theater");
    });
  }

  ngOnInit() {
  }

}
