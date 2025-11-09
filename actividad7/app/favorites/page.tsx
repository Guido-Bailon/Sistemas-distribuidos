"use client"

import { useFavorites, useRemoveFavorite } from "../hooks/useFavorites"
import { useState } from "react"
import PokemonItem from "../components/pokemonItem";

export default function FavoritesPage() {
    const { data: favorites, isLoading, isError } = useFavorites();
    const removeFavorite = useRemoveFavorite();
    const [processingId, setProcessingId] = useState<number | null>(null);

    if (isLoading) return <p className="text-center mt-10"> Loading...</p>
    if (isError) return <p className="text-center mt10 text-red-500">Error loading favorites</p>
    if (!favorites || favorites.length === 0){
        return <p className="text-center mt-10">No favorites yet</p>
    }

    const handleRemove = async (id: number) => {
        setProcessingId(id);
        try{
            await removeFavorite.mutateAsync(id);
        } catch (error) {
            console.error("Error removing favorite: ",error);
        } finally {
            setProcessingId(null);
        }
    };

    return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {favorites.map((fav: any) => (
            <PokemonItem key={fav.pokedex_number} name={fav.name} url={fav.url} />
        ))}
      </div>
    </div>
  );
}