import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import LoadingSpinner from '../../../components/LoadingSpinner';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState(''); // changed from email
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            setIsLoading(true);

            // ✅ login() now returns the dashboard route based on role
            const nextScreen = await login(username, password);

            setIsLoading(false);
            navigation.replace(nextScreen);

        } catch (error) {
            setIsLoading(false);
            Alert.alert('Login Failed', error?.message || 'Invalid credentials');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Motizone</Text>
                    <Text style={styles.subtitle}>Welcome Back</Text>
                </View>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <LoadingSpinner size="small" color="#fff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.signupLink}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.signupText}>
                            Don't have an account? <Text style={styles.signupBold}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
    header: { alignItems: 'center', marginBottom: 50 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
    subtitle: { fontSize: 18, color: '#666' },
    form: { width: '100%' },
    input: {
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    signupLink: { marginTop: 20, alignItems: 'center' },
    signupText: { color: '#666', fontSize: 14 },
    signupBold: { fontWeight: '600', color: '#007bff' },
});

export default LoginScreen;
