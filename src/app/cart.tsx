import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/src/providers/cartProvider';
import { FlatList } from 'react-native';
import CartListItem from '@/src/components/CartListItem';
import Button from '../components/Button';

const CartScreen = () => {
    const { items, total, checkout }  = useCart();
    const checkoutTemplate = () => {
        return (
            <View>
                <Text style={styles.total}>Total: ${total}</Text>
                <Button text="Checkout" onPress={checkout} />
            </View>
        );
    }

    const emptyCartTemplate = () => {
        return (
            <View>
                <Text>Empty cart</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item}/>}
                contentContainerStyle={ styles.list }
            />
            {items.length > 0 ? checkoutTemplate() : emptyCartTemplate()}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    list: {
        gap: 10
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    total: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: '500',
    }
});

export default CartScreen;