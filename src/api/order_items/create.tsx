import { TablesInsert } from "@/src/database.types"
import { supabase } from "@/src/lib/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useInsertOrderItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (items: TablesInsert<'order_items'>[]) => {
            const { data: newOrderItem, error} = await supabase.from('order_items').insert(items).select();
            if(error) throw new Error(error.message);
            return newOrderItem;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['order_items']});
        }
    })
}