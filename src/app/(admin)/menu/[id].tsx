import { Stack, useLocalSearchParams, Link } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import products from '@/assets/data/products';
import { Product } from '@/src/types';
import defaultPizzaImage from '@/src/constants/DefaultPizzaImage';
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";

const productDetails = () => {
    const { id } = useLocalSearchParams();
    const product = products.find((p) => p.id === parseInt(id as string)) as Product;
    if(!product) {
        return <Text>Product not found</Text>
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ 
                title: "details",
                headerRight: () => (
                    <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                        <Pressable>
                            {({ pressed }) => (
                            <FontAwesome
                                name="pencil"
                                size={25}
                                color={Colors.light.tint}
                                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                            )}
                        </Pressable>
                    </Link>
                ), }}/>
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