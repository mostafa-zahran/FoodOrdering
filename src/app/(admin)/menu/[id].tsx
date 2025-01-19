import { Stack, useLocalSearchParams  } from 'expo-router';
import { View, Text, Image, StyleSheet } from 'react-native';
import products from '@/assets/data/products';
import { Product } from '@/src/types';
import defaultPizzaImage from '@/src/constants/DefaultPizzaImage';

const productDetails = () => {
    const { id } = useLocalSearchParams();
    const product = products.find((p) => p.id === parseInt(id as string)) as Product;
    if(!product) {
        return <Text>Product not found</Text>
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
            <Text style={styles.price}>${product.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 18,
    }
});
export default productDetails;