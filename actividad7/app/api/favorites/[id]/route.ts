import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const pokedexNumber = parseInt(id, 10);
        if (isNaN(pokedexNumber) || pokedexNumber <= 0) {
            return NextResponse.json(
                { error: "Invalid pokedex number" },
                { status: 400 }
            );
        }
        const isDeleted = await db.delete(pokedexNumber);
        if (isDeleted) {
            return NextResponse.json(
                { error: "Favorite deleted successfully" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: "Favorite not found" },
                { status: 404 }
            );
        }
    }
    catch (error) {
        return NextResponse.json(
            {error: "Error creating favorite" },
            { status: 500 }
        );
    }
}