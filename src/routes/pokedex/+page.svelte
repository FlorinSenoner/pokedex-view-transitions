<script>
	export let data;
	import { goto } from '$app/navigation';

	const fetchedPokemons = {};
	const activePokemon = {};

	const setActivePokemon = ({ name, url }) => {
		activePokemon.name = name;
		activePokemon.url = url;

		if (window.location.hash === `#${name}`) return;

		goto(`/pokedex/#${name}`, { replaceState: true });
	};

	function actionWhenInViewport(e, { name, url }) {
		const observer = new IntersectionObserver(async (entries) => {
			if (entries[0].isIntersecting) {
				// element in viewport
				if (fetchedPokemons[name]) return;
				const result = await fetch(url);
				const data = await result.json();

				fetchedPokemons[name] = data;
			}
		});

		observer.observe(e);
	}
</script>

<svelte:head>
	<title>Pokedex</title>
</svelte:head>

<div class={'flex-col items-center justify-center py-4 px-4'}>
	<div class="pokedex">
		<div class="front">
			<div class="display">
				<img
					class="main-image"
					src={fetchedPokemons[activePokemon.name]?.sprites?.front_default}
					alt={activePokemon.name}
					style:--tag={activePokemon.name}
				/>
			</div>
			<p class="text-2xl font-bold mt-4" style:--tag="h-{activePokemon.name}">
				{activePokemon.name || ''}
			</p>
		</div>
		<div class="back">
			<ul class="list">
				{#each data.pokemonList as pokemon}
					<li class="list-item">
						<a
							class="link"
							use:actionWhenInViewport={{ name: pokemon.name, url: pokemon.url }}
							href={`/pokedex/${pokemon.name}`}
							on:mousemove={() => setActivePokemon({ name: pokemon.name, url: pokemon.url })}
						>
							{#if fetchedPokemons?.[pokemon.name]?.sprites?.front_default}
								<img
									class="image"
									src={fetchedPokemons?.[pokemon.name]?.sprites?.front_default}
									alt={pokemon.name}
								/>
							{/if}
							<span class="pokemon-name">
								{pokemon.name}
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	:root {
		--min-width: 300px;
		--max-width: 800px;
	}

	.pokedex {
		position: relative;
		container: pokedex / block-size;
		resize: horizontal;
		overflow: hidden;
		min-width: var(--min-width);
		max-width: var(--max-width);
		height: 600px;
		display: flex;
	}

	.front {
		width: 50%;
		background: red;
		transition: all 250ms ease-in-out;
		padding-inline: 20px;
		padding-block: 50px;
	}

	.display {
		width: 100%;
		height: 300px;
		background-color: aquamarine;
		background-size: 250%;
		background-position-x: 50%;
		background-position-y: 50%;
		background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d843okx-eb13e8e4-0fa4-4fa9-968a-e0f36ff168de.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDg0M29reC1lYjEzZThlNC0wZmE0LTRmYTktOTY4YS1lMGYzNmZmMTY4ZGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TIK_E5L8dTyBUk_dADA5WkLP8jSJMR7YGJG54KNAido');
		display: flex;
		border: 1px solid black;
		overflow: hidden;
	}

	.main-image {
		max-width: 100%;
		max-height: 100%;
		width: 100%;
		aspect-ratio: 1;
		object-fit: contain;
		view-transition-name: main-image;
	}

	:global()::view-transition-old(main-image) {
		animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) slide-to-left;
	}
	:global()::view-transition-new(main-image) {
		animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) slide-from-right;
	}

	@keyframes slide-to-left {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			opacity: 0;
			transform: translateX(-10vw);
		}
	}

	@keyframes slide-from-right {
		from {
			opacity: 0;
			transform: translateX(10vw);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.back {
		width: 50%;
		background: rgb(106, 2, 2);
		transition: all 250ms ease-in-out;
		padding-inline: 20px;
		padding-block: 50px;
	}

	.list {
		background: grey;
		width: 100%;
		height: 100%;
		overflow: scroll;
		display: grid;
		grid-template-rows: 1fr;
		gap: 1px;
		background: rgba(0, 0, 0, 0.345);
	}

	.list-item {
		padding: 8px 16px;
		display: flex;
		background: palegoldenrod;
	}

	/* .list .list-item:hover {
		grid-template-rows: 2fr;
	} */

	.image {
		height: 50px;
		aspect-ratio: 1;
	}

	.link {
		display: flex;
		width: 100%;
		justify-content: center;
		gap: 16px;
		align-items: center;
	}

	.pokemon-name {
		display: block;
	}

	@container pokedex (max-width: 600px) {
		.front {
			width: 300px;
		}

		.pokemon-name {
			display: none;
		}

		.back {
			padding-inline: 20px;
			padding-block: 50px;
		}
	}

	@container pokedex (max-width: 400px) {
		.front {
			width: 100cqi;
		}

		.back {
			width: 0%;
			padding: 0;
		}
	}
</style>
