import products from '@//assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';
import { View, FlatList, ScrollView } from 'react-native';

export default function TabOneScreen() {
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

