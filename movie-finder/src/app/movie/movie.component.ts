import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private route:ActivatedRoute, private movies:MoviesService) { }
  movie;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.movies.getMovie(id).subscribe(movie => {
        this.movie = movie
        console.log(this.movie)
      })
    })
  }

}
