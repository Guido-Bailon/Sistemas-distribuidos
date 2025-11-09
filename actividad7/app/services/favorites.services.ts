import { error } from "console";

 
 export interface FavoritePokemon {
    pokedex_number: number,
    created_at: string;
    url: string
 }

 const API_URL = "/api/favorites";

export async function addFavorite(pokedex_number: number): Promise<FavoritePokemon> {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pokedex_number }),
    });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error adding favorite");
  }

  return res.json();
}


 export async function removeFavorite(pokedex_number: number): Promise<void> {
    const res = await fetch(`${API_URL}/${pokedex_number}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error removing favorite");
    }
 }

 export async function getFavorites(): Promise<FavoritePokemon[]> {
    const res = await fetch(API_URL, {
        method: "GET",
    });

    if (!res.ok){
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Error fetching favorites");
    }
    return res.json();
 }