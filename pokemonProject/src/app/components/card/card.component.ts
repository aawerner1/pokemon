import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

	pokemons = [];
	offset: number = 0;

  	constructor(private service: HttpService) {
		this.getAPI()
	}

	loadMore() {
		this.offset += environment.pageLimit;
		this.getAPI()
	}

	getAPI() {
		this.service.getPokemons(this.offset)
		.then( result =>  {
			this.pokemons.push.apply(this.pokemons, result)
		});
	}


	favoritePokemon(pokemon) {
		pokemon.isFavorite = !pokemon.isFavorite;
		pokemon.isFavorite ? localStorage.setItem(pokemon.name, pokemon.id) : localStorage.removeItem(pokemon.name)
	}
}
