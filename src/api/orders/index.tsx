import { supabase } from "@/src/lib/supabase"
import { useQuery } from "@tanstack/react-query"

export const useAdminOrderList = ({archived = false}) => {
    return useQuery({
        queryKey: ['orders', archived],
        queryFn: async () => {
            const { data, error } = await supabase.from('orders').select().in('status', archived ? ['Delivered']: ['New', 'Cooking', 'Delivering']).order('created_at', {ascending: false});
            if(error) { 
                throw new Error(error.message);
            }
            return data;
        }
    })
}