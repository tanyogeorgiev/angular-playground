import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';



const router : Routes = [
  { path: '', component: MoviesComponent },
  { path: 'movie/:id', component: MovieComponent }
];

export const routes :  ModuleWithProviders = RouterModule.forRoot(router);