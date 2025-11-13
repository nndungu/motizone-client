import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signup } from '../../api/auth';

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doSignup = async () => {
    try {
      await signup({ username, password });
      Alert.alert('Account created');
      navigation.navigate('Login');
    } catch (err) {
      console.error(err);
      Alert.alert('Signup failed', err?.response?.data?.message || String(err));
    }
  };

  return (
    <View style={{flex:1,padding:12}}>
      <Text>Username</Text>
      <TextInput value={username} onChangeText={setUsername} style={{borderWidth:1,borderColor:'#ddd',padding:8,marginBottom:12}} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{borderWidth:1,borderColor:'#ddd',padding:8,marginBottom:12}} />
      <Button title="Sign up" onPress={doSignup} />
    </View>
  );
}
