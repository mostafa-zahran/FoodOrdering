import ProductListItem from '@/src/components/ProductListItem';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { useProductList } from '@/src/api/products';

export default function TabOneScreen() {
  const {data: products, error, isLoading} = useProductList()

  if(isLoading){
    return (<ActivityIndicator/>)
  } 

  if(error) { 
    <Text> Failed to fetch products</Text>
  }
  return (
    <FlatList data={products} 
    renderItem={({ item }) => (
      <ProductListItem product={item} />
    )} 
    numColumns={2}
    contentContainerStyle={{gap: 10}}
    columnWrapperStyle={{gap: 10}}
    />
  );
}

