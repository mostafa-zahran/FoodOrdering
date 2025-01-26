import OrderListItem from '@/src/components/OrderListItem';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { useAdminOrderList } from '@/src/api/orders';

export default function TabOneScreen() {
  const { data: orders, error, isLoading } = useAdminOrderList({ archived: false});
  if(isLoading) { 
    return (<ActivityIndicator/>)
  }
  if(error) {
    <Text> Failed to fetch</Text>
  }
  return (
    <FlatList data={orders} 
    renderItem={({ item }) => <OrderListItem order={item} />} 
    contentContainerStyle={{gap: 10}}
    />
  );
}

