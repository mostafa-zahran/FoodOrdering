import { Text, View, Image, StyleSheet } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Tables } from '@/src/types'
import { Link, useSegments } from 'expo-router';
import defaultPizzaImage from '@/src/constants/DefaultPizzaImage';

type ProductListItemProps = {
  product: Tables<'products'>
}

const ProductListItem = ({product} : ProductListItemProps) => {
  const segments = useSegments();
  return (
    <View style={styles.container}>
      <Link href={`${segments[0]}/menu/${product.id}`} style={{marginTop: 10}}>
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
