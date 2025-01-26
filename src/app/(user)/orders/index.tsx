import { useMyOrdersList } from '@/src/api/orders/my_orders';
import OrderListItem from '@/src/components/OrderListItem';
import { ActivityIndicator, FlatList, Text } from 'react-native';

export default function TabOneScreen() {
  const { data: orders, error, isLoading } = useMyOrdersList();
  if(isLoading) { 
    return(<ActivityIndicator/>);
  }
  if(error) {
    <Text>Failed to fetch</Text>
  }
  return (
    <FlatList data={orders} 
    renderItem={({ item }) => <OrderListItem order={item} />} 
    contentContainerStyle={{gap: 10}}
    />
  );
}

