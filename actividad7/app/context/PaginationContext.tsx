'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PokemonContextType {
    offset: number;
    quant: number;
    nextPage: () => void;
    prevPage: () => void;
    increaseQuant: (amount: number) => void;
    resetQuant: () => void;
}

const PaginationContext = createContext<PokemonContextType | null>(null);

export const PaginationProvider = ({ children }: { children: ReactNode}) => {
    const [offset, setOffset] = useState<number>(0);
    const [quant, setQuant] = useState<number>(20);

    const nextPage = () => {
        setOffset(prev => prev + quant);
    }

    const prevPage = () => {
        setOffset(prev => Math.max(0, prev - quant));
    }

    const increaseQuant = (amount: number) => {
        setQuant(prev => prev + amount);
    }

    const resetQuant = () => {
        setQuant(20);
        setOffset(0);
    };

    return (
        <PaginationContext.Provider value={{ offset, quant, nextPage, prevPage, increaseQuant, resetQuant }}>
            {children}
        </PaginationContext.Provider>
    )
}

export const usePaginationContext = (): PokemonContextType => {
    const context = useContext(PaginationContext);
    if (!context){
        throw new Error("usePaginationContext must be used within a PaginationProvider");
    }
    return context;
}