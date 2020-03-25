import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pokemon } from 'src/app/classes/pokemon';

@Injectable({
  	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) { }

	getPokemon(id) {
		return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
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

	getPokemons(limit, offset) {
		return this.http.get(`http://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
		.pipe(
			map(res => {
				res['results'].forEach((element, index) => {
					this.validateLocalStorage(element);
					this.getPokemon(index+1).then(res => Object.assign(element, res))
				})
				return res['results']
			})
		).toPromise()
	}

	validateLocalStorage(pokemon) {
		return localStorage.getItem(pokemon.name) ?  pokemon.isFavorite = true : pokemon.isFavorite = false;
	}
}