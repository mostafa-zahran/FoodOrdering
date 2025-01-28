import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUpdateOrderSubscription = (id: number) => {
    const queryClient = useQueryClient();
    useEffect(()=> {
        const channels = supabase.channel('custom-update-channel')
        .on('postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${id}` },
            (_) => {
                queryClient.invalidateQueries({queryKey: ['orders', id]})
            }
        ).subscribe()

        return (()=> {
            channels.unsubscribe();
        })
    })
}