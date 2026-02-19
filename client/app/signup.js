import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('FARMER'); // Default
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, role }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created! Now log in.");
        router.replace('/'); // Go back to role selection
      } else {
        Alert.alert("Error", data.message || "Signup failed");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join FreshFlow</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      
      <Text style={styles.label}>Register as:</Text>
      <View style={styles.roleRow}>
        {['FARMER', 'DRIVER'].map((r) => (
          <TouchableOpacity 
            key={r} 
            style={[styles.roleBtn, role === r && styles.activeRole]} 
            onPress={() => setRole(r)}
          >
            <Text style={role === r ? {color: '#fff'} : {}}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.btnText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, fontSize: 16 },
  label: { marginBottom: 10, fontWeight: '600' },
  roleRow: { flexDirection: 'row', marginBottom: 30 },
  roleBtn: { padding: 10, borderWidth: 1, marginRight: 10, borderRadius: 5, borderColor: '#28A745' },
  activeRole: { backgroundColor: '#28A745' },
  button: { backgroundColor: '#28A745', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});