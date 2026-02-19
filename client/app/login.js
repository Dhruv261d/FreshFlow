import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth(); 
  const { role } = useLocalSearchParams(); // Get role passed from the first screen
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, role }),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Save to global state!
        login({
          name: data.user.name,
          role: data.user.role,
          token: data.token
        });

        router.replace('/(tabs)/explore'); 
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Connection failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{role} Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number (e.g. 9876543210)"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/signup')} style={{ marginTop: 20 }}>
        <Text style={{ color: '#007BFF', textAlign: 'center' }}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, padding: 10, marginBottom: 30, fontSize: 18 },
  button: { backgroundColor: '#28A745', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});