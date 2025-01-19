import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import products from '@/assets/data/products';
import { Product, PizzaSize } from '@/src/types';
import  { useState} from 'react';
import Button from '@/src/components/Button';
import { useCart } from '@/src/providers/cartProvider';
import defaultPizzaImage from '@/src/constants/DefaultPizzaImage';

const PizzaSizes : PizzaSize[] = ['S', 'M', 'L', 'XL'];
const productDetails = () => {
    const { id } = useLocalSearchParams();
    const { onAddItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
    const product = products.find((p) => p.id === parseInt(id as string)) as Product;
    const router = useRouter();

    const addToCard = () => {
        onAddItem(product, selectedSize);
        router.push('/cart');
    }
    if(!product) {
        return <Text>Product not found</Text>
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />
            <Text>Select Size</Text>
            <View style={styles.sizes}>
                {PizzaSizes.map((size) => (
                    <Pressable 
                      style={ size === selectedSize ? selectedStyles.size : styles.size}  
                      key={size}
                      onPress={() => setSelectedSize(size)}
                    >
                        <Text style={ size === selectedSize ? selectedStyles.sizeText : styles.sizeText}>{size}</Text>
                    </Pressable>
                ))}
            </View>
            <Text style={styles.price}>${product.price}</Text>
            <Button 
              onPress={addToCard}
              text='Add to cart'
            />
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
        marginTop: 'auto',
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    size: {
        backgroundColor: 'white',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        color: 'gray',
        fontSize: 20,
        fontWeight: '500',
    },
});

const selectedStyles = StyleSheet.create({
    size: { 
        ...styles.size,
        backgroundColor: 'gainsboro',
     },
     sizeText: {
        ...styles.sizeText,
        color: 'black',
    },
});
export default productDetails;