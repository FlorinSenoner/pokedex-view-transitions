import pokemonList from '$lib/pokemonList.json';

export const load = function () {
	return {
		pokemonList: pokemonList.results
	};
};
