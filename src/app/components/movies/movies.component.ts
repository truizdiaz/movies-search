import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinct, filter, fromEvent, map, Subscription, switchMap, tap } from 'rxjs';
import { Movie } from 'src/app/interfaces/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies:Movie[] = [];
  @ViewChild('movieSearchInput', { static: true }) movieSearchInput!: ElementRef
  movieSuscription!: Subscription

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
   this.movieSuscription = fromEvent<Event>(this.movieSearchInput.nativeElement, 'keyup').pipe(
      map((event: Event) => {
        const searchTerm = (event.target as HTMLInputElement).value;
        return searchTerm
      }),
      filter((searchTerm: string) => searchTerm.length > 3),
      debounceTime(500),
      distinct(),
      switchMap((searchTerm: string) => this.movieService.getMovies(searchTerm) )
      ).subscribe((movies: Movie[]) => {
        this.movies = movies !== undefined ? movies : [];
      })
  }

  ngOnDestroy(): void {
    this.movieSuscription.unsubscribe()
  }
}
