import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pokemon } from 'src/app/classes/pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) { }

	limit = environment.pageLimit

	getPokemon(url) {
		return this.http.get(url)
		.pipe(
			map(data => {
				let id = data['id'].toString();
				let idImage = id.padStart(3, '0')
				return new Pokemon(
					data['id'],
					data['name'],
					data['weight'],
					data['height'],
					`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idImage}.png`,
					data['base_experience'],
			   )
			})
		).toPromise()
	}

	getPokemons(offset) {
		return this.http.get(`http://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${this.limit}`)
		.pipe(
			map(res => {
				res['results'].forEach((element) => {
					this.validateLocalStorage(element);
					this.getPokemon(element.url).then(res => {Object.assign(element, res)})
				})
				return res['results']
			})
		).toPromise()
	}

	validateLocalStorage(pokemon) {
		return localStorage.getItem(pokemon.name) ?  pokemon.isFavorite = true : pokemon.isFavorite = false;
	}
}