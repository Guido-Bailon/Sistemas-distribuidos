'use client';

import { usePaginationContext } from "../context/PaginationContext";

export default function LoadMoreButton({disabled}: {disabled: boolean}) {
    const { nextPage, prevPage, increaseQuant } = usePaginationContext();

    return (
        <div className="space-x-4 flex justify-center">
            <button 
                onClick={prevPage} 
                disabled={disabled} 
                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
                Previous
            </button>
            <button 
                onClick={() => increaseQuant(20)} 
                disabled={disabled} 
                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {disabled ? 'Loading...' : 'Load More'}
            </button>
            <button 
                onClick={nextPage} 
                disabled={disabled} 
                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    )
}