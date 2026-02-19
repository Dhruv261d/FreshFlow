import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function RoleSelection() {
  const router = useRouter();

  const handleSelect = (selectedRole) => {
    // Navigate to login page and pass the selected role as a parameter
    router.push({ pathname: '/login', params: { role: selectedRole } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FreshFlow</Text>
      <Text style={styles.subtitle}>Who are you?</Text>
      
      <TouchableOpacity 
        style={[styles.button, {backgroundColor: '#28A745'}]} 
        onPress={() => handleSelect('FARMER')}
      >
        <Text style={styles.btnText}>I am a Farmer</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, {backgroundColor: '#007BFF'}]} 
        onPress={() => handleSelect('DRIVER')}
      >
        <Text style={styles.btnText}>I am a Driver</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, {backgroundColor: '#6C757D'}]} 
        onPress={() => handleSelect('ADMIN')}
      >
        <Text style={styles.btnText}>I am an Admin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2D3436' },
  subtitle: { fontSize: 18, color: '#636E72', marginBottom: 40 },
  button: { padding: 18, borderRadius: 12, width: '100%', marginVertical: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});