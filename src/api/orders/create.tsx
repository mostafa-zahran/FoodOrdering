import { supabase } from "@/src/lib/supabase"
import { useAuth } from "@/src/providers/authProvider"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    return useMutation({
        mutationFn: async (data: any) => {
            const {data: newOrder, error} = await supabase.from('orders').insert({
                total: data.total,
                user_id: profile.id,
                status: data.status,
            }).select().single();
            if(error) throw new Error(error.message);
            return newOrder;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['orders']});
        }
    })
}