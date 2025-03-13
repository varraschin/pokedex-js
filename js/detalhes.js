const params = new URLSearchParams(window.location.search);
const numero = params.get("numero");

async function drawPokemon(id) {
    const pokemon = await getPokemon("pokemn/" + id);

    document.title = `Pokemon - ${capitalizeFirstLetter(pokemon.name)}`;

    document.getElementById("anterior").innerHTML = await getPokemonAnterior(
        pokemon.id
    );
    document.getElementById("proximo").innerHTML = await getPokemonProximo(
        pokemon.id
    );

    document.querySelector("h1").innerHTML = `${pokemon.id
        .toString()
        .padStart(3, "0")} - ${capitalizeFirstLetter(pokemon.name)}`;
    
    let descriptions = await getPokemon("pokemon-species/" + pokemon.id); 
    let description = Array.from(descriptions.flavor_text_entries).filter(
        (item) => item.language.name == "en" 
    ); 

    document.getElementById("descricao").innerHTML =
        description[0].flavor_text_replace("\f", " ");

    document.getElementById("imgPoke").innerHTML = carousel (pokemon.sprites); 
    document.getElementById("altura").innerHTML = `${pokemon.height / 10} m`; 
    document.getElementById("peso").innerHTML = `${pokemon.weight / 10} kg`;

    let buttons = document.getElementById("tipos"); 
    buttons.innerHTML = ""; 
    pokemon.types.forEach((value, index) => { 
        let name = getTipo (value.type.name); 
        buttons.innerHTML += `<button class="btn btn-lg btn-${name} text-white">${name}</button>`;
    }); 
}