import Button from "@/src/components/Button";
import { View, Text } from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";
import { supabase } from "@/src/lib/supabase";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";

const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({email, password});
    
        if(error) Alert.alert(error.message);
        setLoading(false);
    }
    return(
        <View style={styles.container}>
            <Stack.Screen options={{title: "Sign In"}} />

            <Text style={styles.label}>Email</Text>
            <TextInput value={email} onChangeText={setEmail} placeholder="john@gmail.com" style={styles.input}/>

            <Text style={styles.label}>Password</Text>
            <TextInput  value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.input}/>

            <Button onPress={signInWithEmail} disabled={loading} text={loading ? "Signing In..." : "Sign In"} />
            <Link href={'/sign-up'} style={styles.selectButton}>Create an account</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding:20,
    },
    label: {
        fontSize: 16,
    },
    input: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    selectButton:{
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },

})

export default SignInScreen;