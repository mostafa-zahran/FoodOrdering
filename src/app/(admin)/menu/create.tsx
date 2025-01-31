import { View, Text, StyleSheet, TextInput, Image, Alert, Platform, ActivityIndicator } from 'react-native';
import Button  from '@/src/components/Button';
import { useState } from 'react';
import defaultPizzaImage from '@/src/constants/DefaultPizzaImage';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useInsertProduct } from '@/src/api/products/create';
import { useUpdateProduct } from '@/src/api/products/update';
import { useProduct } from '@/src/api/products/show';
import { useDeleteProduct } from '@/src/api/products/delete';

const createProduct = () => {
    const { id : idString } = useLocalSearchParams();
    const isUpdate = !!idString;
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);
    const { data: product, error: fetchProductError, isLoading} = isUpdate ? useProduct(id) : {};
    const [name, setName] = useState(isUpdate ? product.name : '');
    const [price, setPrice] = useState(isUpdate ? product.price : '');
    const [image, setImage] = useState<string|null>(isUpdate ? product.image : null);
    const [error, setError] = useState(isUpdate && fetchProductError ? fetchProductError.message : '');
    const {mutate: insertProduct} = useInsertProduct();
    const {mutate: updateProduct} = useUpdateProduct();
    const {mutate: deleteProduct} = useDeleteProduct();
    const router = useRouter();
    if(isLoading) {
        return (<ActivityIndicator/>)
    }
    if(fetchProductError) { 
        setError(fetchProductError?.message);
    }
    const resetValues = () => {
        setName('');
        setPrice('');
    };

    const validate = () => {
        setError('');
        if (!name) {
            setError('name is required');
            return false;
        }
        if (!price) {
            setError('price is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setError('price is not a number');
            return false;
        }
        return true;
    }

    const onUpdate = () => {
        if (!validate()) {
            return;
        }
        updateProduct({id, name, image, price: parseFloat(price)}, {
            onSuccess: () => {
                resetValues();
                router.back();
            }
        })
    }

    const onCreate = () => {
        if (!validate()) {
            return;
        }
         insertProduct({name,price: parseFloat(price), image}, {
            onSuccess: () => {
                resetValues();
                router.back();
            }
         });
        
    };

    const onSubmit = () => {
        if (isUpdate) {
            onUpdate();
        } else {
            onCreate();
        }
    }

    const onDelete = () => {
        deleteProduct(
            id,{
                onSuccess: () => {
                    router.replace('/menu/');
                }
            }
        );
    }
    const confirmDelete = () => {
       Alert.alert('Delete Product', 'Are you sure you want to delete this product?', [
           {text: 'Cancel', style: 'cancel'},
           {text: 'Delete', style: 'destructive', onPress: onDelete},
       ]);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if(!result.canceled){
            setImage(result.assets[0].uri);
        }
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: isUpdate ? "Update Product" : "Create Product"}} />
            <Image source={{uri: image || defaultPizzaImage}} style={styles.image}/>
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input}/>

            <Text style={styles.label}>Price ($)</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder="9.99" style={styles.input} keyboardType='numeric'/>

            <Text style={{color: 'red'}}>{error}</Text>
            <Button onPress={onSubmit} text={isUpdate ? "Update Product" :"Create Product"}/>
            {isUpdate && <Text style={styles.textButton} onPress={Platform.OS === 'web' ? onDelete : confirmDelete}>Delete</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    }
});
export default createProduct;