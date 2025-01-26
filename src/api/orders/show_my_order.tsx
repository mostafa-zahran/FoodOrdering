import { supabase } from "@/src/lib/supabase"
import { useAuth } from "@/src/providers/authProvider"
import { useQuery } from "@tanstack/react-query"

export const useMyOrderDetails = (id: number) => {
    const { profile: {id :profile_id} } = useAuth();
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error} = await supabase.from('orders').select('*, order_items(*, products(*))').eq('id', id).eq('user_id', profile_id).single();
            if (error){
                throw new Error(error.message);
              }
              return data;
        }
    })
}