import axios from 'axios';
import Link from 'next/link';

async function fetchPokemonData(name: string) {
    try{
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
        return null;
    }
}

export default async function PokemonPage({params}: {params: Promise<{name: string}>}) {
    const { name } = await params;
    const pokemonData = await fetchPokemonData(name.toLowerCase());
    if (!pokemonData) {
        return (
            <main>
                <h1>Pokemon not found</h1>
            </main>
        );
    }

    return (
        <main
            style={{
                display: 'flex', //Diseño flexbox
                flexDirection: 'column', // Dirección de columna
                alignItems: 'center', //Alineacion centrada
                padding: '20px'
            }}
        >
            <h1 style={{ textTransform: 'capitalize' }}>{pokemonData.name}</h1>
            <img src={pokemonData.sprites.other['official-artwork'].front_default} alt={pokemonData.name} style={{ width: '200px', height: '200px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px' }}>
                <img src={pokemonData.sprites.front_default} alt={pokemonData.name} style={{ width: '100px', height: '100px' }} />
                <img src={pokemonData.sprites.back_default} alt={pokemonData.name} style={{ width: '100px', height: '100px' }} />
                <img src={pokemonData.sprites.front_shiny} alt={pokemonData.name} style={{ width: '100px', height: '100px' }} />
                <img src={pokemonData.sprites.back_shiny} alt={pokemonData.name} style={{ width: '100px', height: '100px' }} />
            </div>
            <div>
            <p>Height: {pokemonData.height / 10} m</p>
            <p>Weight: {pokemonData.weight / 10} kg</p>
            <p>Abilities: {pokemonData.abilities.map((a: any) => a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)).join(", ")}</p>
            <p>Type/s: {pokemonData.types.map((t: any) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(", ")}</p>
            </div>
            <Link href="/" style={{ marginTop: '20px', display: 'inline-block', color: 'red' }}>Back to Pokedex</Link>
        </main>
    );
}