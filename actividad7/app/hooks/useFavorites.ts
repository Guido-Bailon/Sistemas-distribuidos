import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFavorite, removeFavorite, getFavorites } from "../services/favorites.services";

export function useFavorites() {
    return useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
    })
}

export function useAddFavorites() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] }); 
        },
    });
}

export function useRemoveFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });
}