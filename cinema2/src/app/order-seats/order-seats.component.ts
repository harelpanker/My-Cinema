import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../service/orders.service';
import { ShowsService } from '../service/shows.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-seats',
  templateUrl: './order-seats.component.html',
  styleUrls: ['./order-seats.component.css']
})
export class OrderSeatsComponent implements OnInit {
  newOrder: object = {};
  showObject: any;
  maxTicketsAvailable: number;
  numberOfTickets: number = 1;
  showDateTime: string;

  constructor(private ShowsService: ShowsService, private router: Router ,private OrdersService: OrdersService) { }

  ngOnInit() {
    this.OrdersService.choosenShow.subscribe(show => {
      this.showObject = show;
      this.maxTicketsAvailable = (this.showObject.theaterData[0].rows * this.showObject.theaterData[0].columans) - Object.keys(this.showObject.orderedSeats).length;
      this.showDateTime = moment(this.showObject.dateTime).format('dddd, MMMM Do YYYY, HH:mm');
    });
  }

  onSeatChange(choosenSeatsArray) {
    this.newOrder['seatsOrdered'] = choosenSeatsArray;
  }

  onOrder() {
    if (this.numberOfTickets > 0 && this.showObject._id) {
      this.newOrder["showId"] = this.showObject._id;
      this.newOrder["ticketsNumber"] = this.numberOfTickets;
      this.OrdersService.createOrder(this.newOrder).subscribe(res => {
        this.router.navigate(['/success']);
      }, err => {
        alert("Error in creating order");
      });
    }
  }

}
