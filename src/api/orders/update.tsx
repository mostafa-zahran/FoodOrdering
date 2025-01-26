import { supabase } from "@/src/lib/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({id, status}: {id: number, status: string}) => {
            const { data: updatedOrder, error} = await supabase.from('orders')
            .update({status}).eq('id', id).select().single();
            if(error) throw new Error(error.message);
            return updatedOrder;
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries({queryKey: ['orders']});
            queryClient.invalidateQueries({queryKey: ['orders', data.id]})
        }
    })
}