import {useEffect, useState} from "react";
import axios from "axios";

type PokemonData = {
  sprites: { front_default: string };
  height: number;
  weight: number;
  types: { type: { name: string } }[];
};

export default function PokemonItem({ name, url }: { name: string; url: string }) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cont, setCont] = useState<number>(0);

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

  return (
    <button onClick={() => setCont(cont+1)}>
      <div>
        <div>Clicks: {cont}</div>
        <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
        <div className="flex justify-center">
            <img src={pokemonData.sprites.front_default} alt={`${name} sprite`} />
        </div>
        <p>Height: {pokemonData.height/10} m</p>
        <p>Weight: {pokemonData.weight/10} kg</p>
        <p>Type/s: {pokemonData.types.map((t) => t.type.name).join(", ")}</p>
      </div>
    </button>
  );
}

async function fetchPokemonData(url: string): Promise<PokemonData> {
  const res = await axios.get(url);
  return res.data;
}
