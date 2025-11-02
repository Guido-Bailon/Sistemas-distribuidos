"use client";

import axios from 'axios';
import PokemonItem from './pokemonItem';
import { useQuery } from '@tanstack/react-query';
import { usePokemonContext } from '../context/PokemonContext';
import { usePaginationContext } from '../context/PaginationContext';
import { useEffect } from 'react';
import LoadMoreButton from './loadMoreButton';

const GC_TIME = 1000 * 60 * 5; // 5 minutes
const STALE_TIME = 1000 * 60 * 2; // 2 minutes
type Pokemon = {
    name: string;
    url: string;
};

async function fetchPokemons(quant: number, offset: number): Promise<Pokemon[]> {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${quant}&offset=${offset}`);
    return res.data.results;
}

export default function PokemonList() {
    const { pokemons, setPokemons, addPokemons } = usePokemonContext();
    const { offset, quant } = usePaginationContext();

    const { data, isLoading, isError } = useQuery<Pokemon[]>({
        queryKey: ['pokemons', quant, offset],
        queryFn: () => fetchPokemons(quant ?? 20, offset ?? 0),
        gcTime: GC_TIME,
        staleTime: STALE_TIME,
        placeholderData: (previousData) => previousData
    });

    useEffect(() => {
        if (data) {
            setPokemons(data);
        }
    }, [data,offset, quant, setPokemons]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching pokemons</div>;

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Pokedex</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {pokemons?.map((pokemon) => (
                    <PokemonItem key={pokemon.name} name={pokemon.name} url={pokemon.url} />
                ))}
            </div>
            <LoadMoreButton disabled={false} />
        </div>
    );
}