import { supabase } from "@/src/lib/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const {error, data: deletedProduct} = await supabase.from('products').delete().eq('id', id);
            if (error) { 
                throw new Error(error.message);
            }
            return deletedProduct;
        }, 
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['products']});
        }
    })
}