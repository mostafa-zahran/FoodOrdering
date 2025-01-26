import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import { useMyOrderDetails } from '@/src/api/orders/show_my_order';

const OrderDetails = () => {
    const {id: idString} = useLocalSearchParams();
        const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
        const { data: order, error, isLoading } = useMyOrderDetails(id);
        if(isLoading) return (<ActivityIndicator/>);
        if(error) return(<Text>Failed to fetch</Text>);
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