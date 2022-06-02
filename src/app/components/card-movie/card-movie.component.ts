import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.css']
})
export class CardMovieComponent implements OnInit {
  @Input('movie') movie: any;

  constructor() { }

  ngOnInit(): void {    
  }

  getImagen() {
    return this.movie.Poster !== 'N/A' ? this.movie.Poster : 'https://via.placeholder.com/600'
  }


}
