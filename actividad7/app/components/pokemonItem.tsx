"use client";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAddFavorites, useFavorites, useRemoveFavorite } from "../hooks/useFavorites";
import { useState } from "react";
import { PokemonData, fetchPokemonData } from "../lib/pokeapi";


export default function PokemonItem({ name, url }: { name: string; url: string }) {
  const {data:pokemonData, isLoading, isError} = useQuery<PokemonData, Error>({
    queryKey: ['pokemon', url || name],
    queryFn: () => fetchPokemonData(url || name),
  });


  const {data: favorites } = useFavorites();
  const addFavorite = useAddFavorites();
  const removeFavorite = useRemoveFavorite();
  const [isProcessing, setIsProcessing] = useState(false);

  if (isError) return <div>Error fetching Pokémon data</div>;
  if (!pokemonData) return <div>Loading...</div>;

  const imageSrc = pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default || '/placeholder.png';

  const isFavorite = favorites?.some(
    (f: any) => f.pokedex_number === pokemonData.id
  )

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // evita abrir el link
    e.stopPropagation();
    setIsProcessing(true);
    try {
      if (isFavorite) {
        await removeFavorite.mutateAsync(pokemonData.id);
      } else {
        await addFavorite.mutateAsync(pokemonData.id);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    } finally {
      setIsProcessing(false);
    }
  };  
  
  return (
    <div className="pokemon-item">
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
        <Link href={`/pokemon/${pokemonData.name}`}>
          <h3 style={{ textTransform: "capitalize", textAlign: "center" }}>{name}</h3>
          <div className="flex justify-center">
            <img src={imageSrc} alt={`${name} sprite`} />
          </div>
        </Link>
        <button
          type="button"
          onClick={(e) => { void handleToggleFavorite(e) }}
          disabled={isProcessing}
          style={{
            marginTop: "10px",
            padding: "6px 12px",
            backgroundColor: isFavorite ? "#f56565" : "#48bb78",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isProcessing ? "not-allowed" : "pointer",
            opacity: isProcessing ? 0.7 : 1,
          }}>
          {isProcessing
                    ? "..."
                    : isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"}
        </button>
        </>
      )}
    </div>
  )
}
