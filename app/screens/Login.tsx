import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const signUp = async () => {

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered successfully.");
            alert("Check your email!");
        } catch (error) {
            console.error("Registration error: ", error);
            alert("Registration failed. Please check your input and try again.");
        }
    }

    const signIn = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in: ", user);
            alert("You are now signed in!");
        } catch (error) {
            console.error("Sign-in error: ", error);
            alert("Sign-in failed. Please check your credentials and try again.");
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Email'
                onChangeText={(text: string) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                textContentType='password'
                placeholder='Password'
                onChangeText={(text: string) => setPassword(text)}
                value={password}
            />

            <View style={styles.buttonContainer}>
                <Button onPress={signUp} title="Create account" />
                <Button onPress={signIn} title="Sign in" />
            </View>

        </View>
    );
};

export default Login

const styles = StyleSheet.create({


    container: {
        marginHorizontal: 20,
        flexDirection: "column",
        paddingVertical: 10
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fff",
        marginVertical: 10,
        zIndex: 1,
        color: "black"

    },

    buttonContainer: {
        marginTop: 15,
        paddingVertical: 10,
        gap: 5,       
        justifyContent: "center",
       
    
    }


})