<script>
	export let data;

	$: ({ name, sprites, types = [], stats = [], abilities = [] } = data);
</script>

<svelte:head>
	<title>Pokemon - {name}</title>
</svelte:head>

<div class={'flex items-center justify-center py-4 px-4'}>
	<div class="flex flex-col items-center sm:w-2/4">
		<!-- Inline style works around https://github.com/tailwindlabs/tailwindcss/issues/506 -->
		<img
			class="object-cover border-gray-100 border-2 rounded-full"
			src={sprites.front_default}
			width="240"
			style:height="240px"
			alt={`picture of ${name}`}
			style:--tag={name}
		/>
		<h1 class="text-4xl font-bold mt-4" style:--tag="h-{name}">{name}</h1>
	</div>

	<div class="flex flex-col stats">
		<div class="flex flex-col">
			<h3 class="text-lg leading-6 font-medium text-gray-900">Stats</h3>
			<ul>
				{#each stats as { stat, base_stat }}
					<li>{stat.name}: {base_stat}</li>
				{/each}
			</ul>
		</div>

		<div class="flex flex-col mt-4">
			<h3 class="text-lg leading-6 font-medium text-gray-900">Types</h3>
			<ul>
				{#each types as { type }}
					<li>{type.name}</li>
				{/each}
			</ul>
		</div>

		<div class="flex flex-col mt-4">
			<h3 class="text-lg leading-6 font-medium text-gray-900">Abilities</h3>
			<ul>
				{#each abilities as { ability }}
					<li>{ability.name}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.stats {
		view-transition-name: stats;
	}

	:global()::view-transition-old(stats) {
		animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) slide-to-right;
	}
	:global()::view-transition-new(stats) {
		animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) slide-from-right;
	}

	@keyframes slide-to-right {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			opacity: 0;
			transform: translateX(10vw);
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
</style>
