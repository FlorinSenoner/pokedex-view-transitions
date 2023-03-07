import pokemonList from '$lib/pokemonList.json';

// import { error } from '@sveltejs/kit';

const fetchedPokemons = {};

export const load = async function (req) {
	const { name } = req.params;

	const pokemon = pokemonList.results.find((pokemon) => pokemon.name === name);

	if (fetchedPokemons[name]) return fetchedPokemons[name];

	const result = await fetch(pokemon.url);
	const data = await result.json();

	fetchedPokemons[name] = data;

	return fetchedPokemons[name];

	// if (map[name]) {
	// 	return map[name];
	// } else {
	// 	throw error(404);
	// }
};
