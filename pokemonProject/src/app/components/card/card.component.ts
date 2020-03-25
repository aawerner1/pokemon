import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

	pokemons;
	loadedPokemons: number = 0;
	pokemonsToLoad: number = 3;

  	constructor(private service: HttpService) {
		this.service.getPokemons(this.loadedPokemons, this.pokemonsToLoad)
		.then( result => {
			this.pokemons = result;
		})
	}

	ngOnInit() {
	}

	loadMore() {
		this.loadedPokemons = this.pokemonsToLoad;
		this.pokemonsToLoad = this.loadedPokemons + 3;
		console.log(this.loadedPokemons + '/' + this.pokemonsToLoad);
		this.service.getPokemons(this.loadedPokemons, this.pokemonsToLoad).then( result => console.log(result));
	}


	favoritePokemon(pokemon) {
		pokemon.isFavorite = !pokemon.isFavorite;
		pokemon.isFavorite ? localStorage.setItem(pokemon.name, pokemon.id) : localStorage.removeItem(pokemon.name)
	}
}
