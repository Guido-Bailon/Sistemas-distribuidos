'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Pokemon = {
    name: string;
    url: string;
}


interface PokemonContextType {
    pokemons: Pokemon[];
    setPokemons: (pokemons: Pokemon[]) => void;
    addPokemons: (pokemons: Pokemon[]) => void;
}

const PokemonContext = createContext<PokemonContextType | null>(null);

export const PokemonProvider = ({ children }: { children: ReactNode}) => {
    const [pokemons, setPokemonsState] = useState<Pokemon[]>([]);

    const setPokemons = (newPokemons: Pokemon[]) => setPokemonsState(newPokemons);
    const addPokemons = (newPokemons: Pokemon[]) => {
        const existing = new Set(pokemons.map((p) => p.name));
        const filtered = newPokemons.filter((p) => !existing.has(p.name));
        return setPokemonsState((prev) => [...prev, ...filtered]);
    }

    return (
        <PokemonContext.Provider value={{ pokemons, setPokemons, addPokemons }}>
            {children}
        </PokemonContext.Provider>
    )
}

export const usePokemonContext = (): PokemonContextType => {
    const context = useContext(PokemonContext);
    if (!context){
        throw new Error("usePokemonContext must be used within a PokemonProvider");
    }
    return context;
}
