import Button from '@/src/components/Button';
import {useState} from 'react';
import { View, Text, StyleSheet, TextInput, } from 'react-native';
import Colors from '@/src/constants/Colors';
import { useRouter, Stack, useLocalSearchParams, Redirect } from 'expo-router';
import { supabase } from '@/src/lib/supabase';

const SignInScreen = () => {
    const { new_user } = useLocalSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const isNewUser = new_user === 'true';
    const validate = () => {
        setError('');
        if (!email) {
            setError('Email is required');
            return false;
        }
        if (!password) {
            setError('Password is required');
            return false;
        }
        return true;
    }

    const onSubmit = () => {
        setLoading(true);
        if (!validate()){
            return
        }
        console.log('Submiting...');
        if (isNewUser) {
            onSignUp();
        } else {
            onSignIn();
        }
        setLoading(false);
    };

    const onSignUp = async () => {
        const { error } = await supabase.auth.signUp({email,password});
        if (error) {
            setError(error.message);
        } else {
            <Redirect href='/(auth)'/>
        }
    }

    const onSignIn = async () => {
        const { error } = await supabase.auth.signInWithPassword({email,password});
        
        if (error) {
            setError(error.message);
        } else {
            <Redirect href='/(auth)'/>
        }
    }

    const goToSignUp = () => {
        router.push('/(auth)?new_user=true');
    };

    const goToSignIn = () => {
        router.push('/(auth)?new_user=false');
    }

    const secondaryButtonTemplate = () => {
        if (isNewUser) {
            return (
                <Text onPress={goToSignIn} style={styles.textButton}>Already have an account? Sign In</Text>
            );
        } else {
            return (
                <Text onPress={goToSignUp} style={styles.textButton}>Don't have an account? Sign Up</Text>
            );
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen name={isNewUser ? "sign-up" : "sign-in"} options={{ headerShown: true,title: isNewUser ? "SignUp" : "SignIn" }}/>
            <Text style={styles.label}>Email</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} />

            <Text style={styles.label}>Password</Text>
            <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry={true} />

            <Text style={{color: 'red'}}>{error}</Text>
            <Button disabled={loading} text={isNewUser ? "SignUp" : "Sign In"} onPress={onSubmit}/>
            {secondaryButtonTemplate()}
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
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    }
});

export default SignInScreen;