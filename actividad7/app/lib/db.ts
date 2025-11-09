import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'database.json');
const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export interface Pokemon {
    pokedex_number: number;
    created_at: string;
    url: string;
}

class Database {
    private async readDB(): Promise<Pokemon[]> {
        try {
            const data = await fs.readFile(DB_PATH, 'utf-8');
            return JSON.parse(data) as Pokemon[];
        } catch (error) {
            console.error("Error reading database:", error);
            return [];
        }
    }

    private async writeDB(data: Pokemon[]): Promise<void> {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }

    async getAll(): Promise<Pokemon[]> {
        return this.readDB();
    }

    async getByPokedexNumber(pokedex_number: number): Promise<Pokemon | null> {
        const pokemons = await this.readDB();
        return pokemons.find(p => p.pokedex_number === pokedex_number) || null;
    }

    async create(pokedex_number: number | string): Promise<Pokemon> {
        const num = typeof pokedex_number === 'string'
            ? parseInt(pokedex_number.trim(), 10)
            : pokedex_number;

        if (!Number.isInteger(num) || num <= 0) {
            throw new Error('Invalid pokedex number');
        }   

        const data = await this.readDB();
        const newPokemon: Pokemon = {
            pokedex_number: num,
            created_at: new Date().toISOString(),
            url: `${API_URL}${num}/`
        };
        if (data.find(p => p.url === newPokemon.url)) {
            throw new Error('Pokemon with this URL already exists');
        }
        data.push(newPokemon);
        await this.writeDB(data);
        return newPokemon;
    }

    async delete(pokedex_number: number): Promise<boolean> {
        const data = await this.readDB();
        const index = data.findIndex(p => p.pokedex_number === pokedex_number);
        const filtered = data.filter(p => p.pokedex_number !== pokedex_number);
        if (index === -1) {
            return false;
        }
        await this.writeDB(filtered);
        return true;
    }

    async update(pokedex_number:number, updates: Partial<Omit<Pokemon, 'pokedex_number' | 'created_at'>>): Promise<Pokemon | null> {
        const data = await this.readDB();
        const index = data.findIndex(p => p.pokedex_number === pokedex_number);

        if (index === -1) {
            return null;
        }
        data[index] = {
            ...data[index],
            ...updates
        };
        await this.writeDB(data);
        return data[index];
    }
}

export const db = new Database();
