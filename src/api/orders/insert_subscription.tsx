import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useInserOrderSubscription = () => {
    const queryClient = useQueryClient();
  useEffect(()=> {
    const channels = supabase.channel('custom-insert-channel').on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      (_) => {
        queryClient.invalidateQueries({queryKey: ['orders']})
      }).subscribe()
    return (()=> {
      channels.unsubscribe();
    })
  })
}