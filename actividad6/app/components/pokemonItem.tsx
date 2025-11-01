"use client";
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";

type PokemonData = {
  sprites: { front_default: string;
    other: { 'official-artwork': { front_default: string } }
   };
  height: number;
  weight: number;
  types: { type: { name: string } }[];
};

export default function PokemonItem({ name, url }: { name: string; url: string }) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPokemonData(url);
        setPokemonData(data);
      } catch (err) {
        setError("No se pudo cargar el Pokémon");
      }
    };
    fetchData();
  }, [url]);

  if (error) return <div>{error}</div>;
  if (!pokemonData) return <div>Loading...</div>;

const imageSrc = pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default || '/placeholder.png';
  return (
    <Link href={`/pokemon/${name}`}>
        <div>
            <h3 style={{ textTransform: 'capitalize', textAlign: 'center' }}>{name}</h3>
            <div className="flex justify-center">
                <img src={imageSrc} alt={`${name} sprite`} />
            </div>
        </div>
    </Link>
  );
}

async function fetchPokemonData(url: string): Promise<PokemonData> {
  const res = await axios.get(url);
  return res.data;
}