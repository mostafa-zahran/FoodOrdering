import { supabase } from "@/src/lib/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const { error, data: updatedProduct} = await supabase.from('products').update({
                name: data.name,
                image: data.image,
                price: data.price
            }).eq('id', data.id).single();
            if(error){
                throw new Error(error.message);
            }
            return updatedProduct;
        },
        onSuccess: async (_, { id }) => {
            await queryClient.invalidateQueries({queryKey: ['products']});
            await queryClient.invalidateQueries({queryKey: ['product', id]});
        }
    })
}