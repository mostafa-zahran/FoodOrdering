import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Order } from '@/src/types';
import { Link, useSegments } from 'expo-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

type OrderListItemProps = {
    order: Order
}

const OrderListItem = ({ order } : OrderListItemProps) => {
    const segmants = useSegments();
    return (
        <Link href={`/${segmants[0]}/orders/${order.id}`} asChild>
            <Pressable  style={styles.container}>
                <View>
                    <Text style={styles.title}> Order #{order.id} </Text>
                    <Text style={styles.time}> {dayjs(order.created_at).fromNow()} </Text>
                </View>
                <Text style={styles.status}> {order.status} </Text>
            </Pressable>
        </Link>
    );
};

export default OrderListItem;


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      marginVertical: 5,
    },
    time: {
      color: 'gray',
    },
    status: {
      fontWeight: '500',
    },
});
