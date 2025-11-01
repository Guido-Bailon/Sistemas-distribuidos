"use client";

import axios from 'axios';
import PokemonItem from './pokemonItem';
import { useEffect, useState } from 'react';

type Pokemon = {
    name: string;
    url: string;
};

export default function PokemonList({quant = 20}: {quant?: number}) {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]); //hook para almacenar la lista de pokemones
    const [loading, setLoading] = useState<boolean>(true); //hook para manejar el estado de carga
    const [error, setError] = useState<string | null>(null); //hook para manejar errores

    useEffect(() => {
        const fetchPokemons = async (quant:number) => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${quant}&offset=0`);
                setPokemons(res.data.results); //dispara el hook de pokemones
            } catch (error) {
                setError("Error fetching pokemons"); //dispara el hook de error
            } finally {
                setLoading(false); //dispara el hook de carga
            }
        };
        fetchPokemons(quant);
    }, [quant]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Pokedex</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {pokemons.map((pokemon) => (
                    <PokemonItem key={pokemon.name} name={pokemon.name} url={pokemon.url} />
                ))}
            </div>
        </div>
    );
}