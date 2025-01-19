import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/src/providers/cartProvider';
import { FlatList } from 'react-native';
import CartListItem from '@/src/components/CartListItem';

const CartScreen = () => {
    const { items }  = useCart();
    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item}/>}
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ' #f5f5f5',
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
});

export default CartScreen;