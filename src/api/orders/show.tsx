import { supabase } from "@/src/lib/supabase"
import { useQuery } from "@tanstack/react-query"

export const useAdminOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error} = await supabase.from('orders').select('*, order_items(*, products(*))').eq('id', id).single();
            if (error){
                throw new Error(error.message);
              }
              return data;
        }
    })
}