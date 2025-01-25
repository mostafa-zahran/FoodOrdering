import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: number) => {
 return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select().eq('id', id).single();
      if (error){
        throw new Error(error.message);
      }
      return data;
    }
  });
}
