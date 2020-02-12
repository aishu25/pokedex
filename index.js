$(document).ready(function() {
    const poke_container = document.getElementById('poke_container');
    const pokemons_number = 150;
    const colors = {
        fire: '#ff0000',
        grass: '#33cc33',
        electric: '#ebcc2d',
        water: '#26b2f2',
        ground: '#d09962',
        rock: '#663300',
        fairy: '#f099ff',
        poison: '#6cc67e',
        bug: '#ed9212',
        dragon: '#4677d2',
        psychic: '#d5da3e',
        flying: '#668cff',
        fighting: '#b4a27e',
        normal: '#b3b3b3'
    };
    const main_types = Object.keys(colors);

    const fetchPokemons = async () => {
        for (let i = 1; i <= pokemons_number; i++) {
            await getPokemon(i);
        }
    };

    const getPokemon = async id => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokemon = await res.json();
        createPokemonCard(pokemon);
    };

    function createPokemonCard(pokemon) {
        const pokemonEl = document.createElement('div');
        pokemonEl.classList.add('pokemon');

        const poke_types = pokemon.types.map(type => type.type.name);
        const type = main_types.find(type => poke_types.indexOf(type) > -1);
        const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        const color = colors[type];
        
        pokemonEl.style.backgroundColor = color;

        const pokeInnerHTML = `
            <div class="img-container">
                <img src="https://pokeres.bastionbot.org/images/pokemon/${
                                pokemon.id
                            }.png" alt="${name}" />
            </div>
            <div class="info">
                <span class="number">#${pokemon.id
                                .toString()
                                .padStart(3, '0')}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Type: <span>${type}</span></small>
            </div>
        `;

        pokemonEl.innerHTML = pokeInnerHTML;
        poke_container.appendChild(pokemonEl);
        
    }
    fetchPokemons();
});
