import { supabase } from "@/src/lib/supabase"
import { useAuth } from "@/src/providers/authProvider"
import { useQuery } from "@tanstack/react-query"

export const useMyOrdersList = () => {
    const { profile: { id } } = useAuth()
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select().eq('user_id', id).order('created_at', {ascending: false});
            if(error) {
                throw new Error(error.message);
            }
            return data;
        }
    })
}