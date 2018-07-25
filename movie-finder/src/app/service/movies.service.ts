import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  apiKey = 'b1065dadc4bb5e72222d36c86335e580';
  path = 'https://api.themoviedb.org/3/';
  genreString = ''
  search  = 'search/multi?query=';
  auth = '&api_key=';
  find = 'movie/'

  mostPopular() {
    this.genreString = 'discover/movie?sort_by=popularity.desc';
    const uri = this.path + this.genreString + this.auth + this.apiKey;
    console.log(uri);
    return this.http.get(uri);
  }

  mostPopularTheater() {
    this.genreString ='discover/movie?primary_release_date.gte=2017-07-07&primary_release_date.lte=2018-07-22'
    const uri = this.path + this.genreString + this.auth + this.apiKey;
    return this.http.get(uri);
  }

  mostPopularKids() {
    this.genreString = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc'
    const uri = this.path + this.genreString + this.auth + this.apiKey;
    return this.http.get(uri);
  }
  mostPopularDrama() {
    this.genreString = 'discover/movie?with_genres=18'
    const uri = this.path + this.genreString + this.auth + this.apiKey;
    return this.http.get(uri);
  }

  findByString(searchString: string) {
    console.log(searchString)
    const uri = this.path + this.search + searchString + this.auth + this.apiKey;
    return this.http.get(uri);

  }


  getMovie(id) {
    let auth = '?api_key=';
    const uri = this.path + this.find + id + auth + this.apiKey;
    console.log(uri)
    return this.http.get(uri);
  }
}
