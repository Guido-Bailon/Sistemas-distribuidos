"use client";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 

type PokemonData = {
  sprites: { front_default: string;
    other: { 'official-artwork': { front_default: string } }
   };
  height: number;
  weight: number;
  types: { type: { name: string } }[];
};

export default function PokemonItem({ name, url }: { name: string; url: string }) {

  const {data:pokemonData, isLoading, isError} = useQuery<PokemonData, Error>({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonData(url),
  });

  if (isError) return <div>Error fetching Pokémon data</div>;
  if (!pokemonData) return <div>Loading...</div>;

const imageSrc = pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default || '/placeholder.png';
  return (
    <Link href={`/pokemon/${name}`}>
        <div>
          {isLoading ? (
            <>
              <Skeleton height={100} width={100} style={{marginBottom: '10px'}}/>
              <Skeleton height={20} width={`100%`} />
              <div className="flex justify-center">
                  <Skeleton height={100} width={100} />
              </div>
            </>
          ) : (
            <>
              <h3 style={{ textTransform: 'capitalize', textAlign: 'center' }}>{name}</h3>
              <div className="flex justify-center">
                  <img src={imageSrc} alt={`${name} sprite`} />
              </div>
            </>
          )}
        </div>
    </Link>
  );
}

async function fetchPokemonData(url: string): Promise<PokemonData> {
  const res = await axios.get(url);
  return res.data;
}