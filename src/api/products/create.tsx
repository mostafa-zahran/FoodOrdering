import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertProduct = () => {
  const queryClient = useQueryClient();
 return useMutation({ 
    mutationFn: async (data: any) => {
      const { error, data: newProduct } = await supabase.from('products').insert({
        name: data.name,
        image: data.image,
        price: data.price
      })
      if (error){
        throw new Error(error.message);
      }
      return newProduct;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  });
}
