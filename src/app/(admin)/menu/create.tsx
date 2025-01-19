import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import Button  from '@/src/components/Button';
import { useState } from 'react';
import defaultPizzaImage from '@/src/constants/DefaultPizzaImage';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';

const createProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<string|null>(null);
    const [error, setError] = useState('');

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

    const onCreate = () => {
        if (!validate()) {
            return;
        }
        console.log('create product ');
        resetValues();
    };

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
            <Stack.Screen options={{title: "Create Product"}} />
            <Image source={{uri: image || defaultPizzaImage}} style={styles.image}/>
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input}/>

            <Text style={styles.label}>Price ($)</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder="9.99" style={styles.input} keyboardType='numeric'/>

            <Text style={{color: 'red'}}>{error}</Text>
            <Button onPress={onCreate} text="Create Product"/>
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