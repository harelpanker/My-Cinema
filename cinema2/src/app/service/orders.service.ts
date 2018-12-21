import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrdersService {

  ordersUrl = 'http://localhost:3000/orders';

  private showSource = new BehaviorSubject({});
  choosenShow = this.showSource.asObservable();

  private numOfTicketsSource = new BehaviorSubject(0);
  numOfTickets = this.numOfTicketsSource.asObservable();

  constructor(private http: HttpClient) { }

  // Create a new order
  createOrder(order: any): Observable<any> {
    return this.http.post(this.ordersUrl, order);
  }

  // Return the orders list
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.ordersUrl);
  }

  // Return order details
  getOrderDetails(orderId): Observable<any> {
    return this.http.get<any[]>(this.ordersUrl + '/' + orderId);
  }

  // edit order
  editOrder(order: any): Observable<any> {
    return this.http.put<any[]>(this.ordersUrl, order);
  }

  // Return order details
  deleteOrder(orderId): Observable<any[]> {
    return this.http.delete<any[]>(this.ordersUrl + '/' + orderId);
  }

  changeNumberOfTicket(num: number) {
    this.numOfTicketsSource.next(num);
    alert(num);
  }

  updateChoosenShow(show: object) {
    this.showSource.next(show);
  }
}
