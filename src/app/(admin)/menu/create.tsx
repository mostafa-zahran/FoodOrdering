import { View, Text, StyleSheet, TextInput, Image, Alert, Platform } from 'react-native';
import Button  from '@/src/components/Button';
import { useState } from 'react';
import defaultPizzaImage from '@/src/constants/DefaultPizzaImage';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

const createProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<string|null>(null);
    const [error, setError] = useState('');
    const {id}= useLocalSearchParams();
    const isUpdate = !!id;

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
        if (!image) {
            setError('image is required');
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
        console.log('update product');
        resetValues();
    }

    const onCreate = () => {
        if (!validate()) {
            return;
        }
        console.log('create product ');
        resetValues();
    };

    const onSubmit = () => {
        if (isUpdate) {
            onUpdate();
        } else {
            onCreate();
        }
    }

    const onDelete = () => {
        console.log('delete product');
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