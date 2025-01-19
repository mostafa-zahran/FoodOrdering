import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';

const OrderDetails = () => {
    const {id} = useLocalSearchParams();
    const order = orders.find((o) => o.id === parseInt(id as string));
    if(!order) {
        return <View><Text>Order not found</Text></View>
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />
            <OrderListItem order={order} />
             <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} /> } />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      padding: 10,
      flex: 1,
      gap: 10,
    },
  });

export default OrderDetails;