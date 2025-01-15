import { Text, View, Image, StyleSheet } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Product } from '@/src/types'
import { Link } from 'expo-router';

const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'
type ProductListItemProps = {
  product: Product
}

const ProductListItem = ({product} : ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Link href={`/menu/${product.id}`} style={{marginTop: 10}}>
        <Image source={{uri: product.image || defaultPizzaImage}} 
          style={styles.image}
          resizeMode='contain'
          />
        <Text style={styles.title}> {product.name} </Text>
        <Text style={styles.price}> ${product.price} </Text>
      </Link>
    </View>
  );
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%',
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold'
  },
});
