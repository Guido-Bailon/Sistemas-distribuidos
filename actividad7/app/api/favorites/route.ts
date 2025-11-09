import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function POST(request: Request) {
  try{
    const body = await request.json();
    const { pokedex_number } = body;

    if (!pokedex_number) {
      return NextResponse.json(
        { error: "Missing pokedex_number" },
        { status: 400 }
      );
    }

    const existing = await db.getByPokedexNumber(pokedex_number);
    if (existing){
        return NextResponse.json(
            { error : "Pokemon already in favorites" },
            { status: 400 }
        )
    }

    const newFavourite = await db.create(pokedex_number);
    return NextResponse.json(
        newFavourite,
        { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
        { error: "Internal server error"},
        { status: 500 }
    )
  }
}


export async function GET() {
    try{
        const favorites = await db.getAll();
        return NextResponse.json(favorites, {status: 200});
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error "},
            { status: 500}
        )
    }
}