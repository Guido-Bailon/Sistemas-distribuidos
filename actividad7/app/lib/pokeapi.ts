import axios from "axios";

const API_URL =  "https://pokeapi.co/api/v2/pokemon/"

export type PokemonData = {
    id: number,
    name: string,
    sprites: {
        front_default: string,
        other: { 'official-artwork' : { front_default: string} };
    },
    height: number,
    weight: number,
    types: { type: { name: string } }[];
}

export async function fetchPokemonData(identifier: number | string): Promise<PokemonData> {
    let endpoint: string;

    if (typeof identifier === "string" && identifier.startsWith("http")) {
        endpoint = identifier;
    } else {
        endpoint = `${API_URL}${identifier}/`;
    }

    const res = await axios.get<PokemonData>(endpoint);
    return res.data;
}