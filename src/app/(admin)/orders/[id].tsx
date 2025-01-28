import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';
import React from 'react';
import { OrderStatusList } from '@/src/types';
import Colors from '@/src/constants/Colors';
import { useAdminOrderDetails } from '@/src/api/orders/show';
import { useUpdateOrder } from '@/src/api/orders/update';
import { useUpdateOrderSubscription } from '@/src/api/update_supscription';

const OrderDetails = () => {
  const { mutate: updateOrder } = useUpdateOrder();
    const {id: idString} = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
    const { data: order, error, isLoading } = useAdminOrderDetails(id);
    useUpdateOrderSubscription(id);
    if(isLoading) return (<ActivityIndicator/>);
    if(error) return(<Text>Failed to fetch</Text>);
    if(!order) {
        return <View><Text>Order not found</Text></View>
    }
  
    const onUpdate = (status: string) => {
      updateOrder({id, status});
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />
            <OrderListItem order={order} />
             <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} /> } 
                ListFooterComponent={ () => (
                  <>
                    <Text style={{ fontWeight: 'bold' }}>Status</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                    {OrderStatusList.map((status) => (
                      <Pressable
                        key={status}
                        onPress={() => onUpdate(status)}
                        style={{
                        borderColor: Colors.light.tint,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 5,
                        marginVertical: 10,
                        backgroundColor:
                        order.status === status
                        ? Colors.light.tint
                        : 'transparent',
                        }}
                      >
                        <Text
                          style={{
                            color:
                            order.status === status ? 'white' : Colors.light.tint,
                          }}
                        >
                          {status}
                        </Text>
                      </Pressable>
                      ))}
                    </View>
                  </>
                )}/>
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