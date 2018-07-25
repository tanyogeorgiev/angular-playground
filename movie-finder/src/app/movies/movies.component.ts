import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  constructor(private movies: MoviesService) {}
  popular: [Movie];
  theaters: [Movie];
  kids : [Movie];
  drama : [Movie];

  ngOnInit() {
    console.log('онИнит')
    this.movies.mostPopular().subscribe(data => {
      this.popular = data['results'];
      console.log(data);
    });
    this.movies.mostPopularTheater().subscribe(data => {
      this.theaters = data['results'];
      console.log(data);
    });

    this.movies.mostPopularKids().subscribe(data => {
      this.kids = data['results'];
      console.log(this.kids );
    });

    this.movies.mostPopularDrama().subscribe(data => {
      this.drama = data['results'];
      console.log(data);
    });
  }

  find(searchParam: Object) {
    console.log(searchParam);
    this.movies.findByString(searchParam['search']).subscribe(data => {
      console.log('Find:' + data);
      this.popular = data['results'];

    });
  }
}
