import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { EditComponent } from './edit/edit.component';
import { UsersComponent } from './users/users.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { OrderComponent } from './order/order.component';
import { TheaterComponent } from './theater/theater.component';
import { TheaterNewComponent } from './theater-new/theater-new.component';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowNewComponent } from './show-new/show-new.component';
import { OrderSeatsComponent } from './order-seats/order-seats.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'theater', component: TheaterComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: MovieComponent },
  { path: 'movies/edit/:id', component: EditComponent },
  { path: 'login', component: UsersComponent },
  { path: 'login/newMovie', component: NewMovieComponent },
  { path: 'newMovie/:id/edit', component: EditComponent },
  { path: 'order/:id', component: OrderComponent },
  { path: 'theater/new', component: TheaterNewComponent },
  { path: 'shows', component: ShowListComponent },
  { path: 'show/new', component: ShowNewComponent },
  { path: 'orderseats', component: OrderSeatsComponent },
  { path: 'success', component: SuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
