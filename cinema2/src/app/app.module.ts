import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MoviesService } from './service/movies.service';
import { TheaterService } from './service/theater.service';
import { OrdersService } from './service/orders.service';
import { ShowsService } from './service/shows.service';

import { AppRoutingModule } from './app-routing.module';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { CarouselSliderComponent } from './carousel-slider/carousel-slider.component';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { MovieComponent } from './movie/movie.component';
import { EditComponent } from './edit/edit.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { TheaterComponent } from './theater/theater.component';
import { TheaterNewComponent } from './theater-new/theater-new.component';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowNewComponent } from './show-new/show-new.component';
import { OrderSeatsComponent } from './order-seats/order-seats.component';
import { SeatsCanvasDirective } from './directives/seats-canvas.directive';
import { OrderComponent } from './order/order.component';
import { SuccessComponent } from './success/success.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HomeComponent,
    UsersComponent,
    CarouselSliderComponent,
    MovieComponent,
    EditComponent,
    NewMovieComponent,
    TheaterComponent,
    TheaterNewComponent,
    ShowListComponent,
    ShowNewComponent,
    OrderSeatsComponent,
    SeatsCanvasDirective,
    OrderComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FilterPipeModule
  ],
  providers: [MoviesService, TheaterService, OrdersService, ShowsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
