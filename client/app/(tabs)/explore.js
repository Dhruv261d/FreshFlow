import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// 1. Get the global user state from Context
import { useAuth } from '../../context/AuthContext'; 
// 2. Get the fetch function from Services
import { fetchProtectedData } from '../../services/api'; 

export default function FarmerDashboard() {
  const { user } = useAuth(); // Access the token stored during login
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    const checkAccess = async () => {
      if (user?.token) {
        // Pass the token from Context into the API service
        const responseMessage = await fetchProtectedData(user.token);
        if (responseMessage) setMessage(responseMessage);
      } else {
        setMessage("No token found. Please login.");
      }
    };

    checkAccess();
  }, [user]); // Runs whenever the user state changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer Dashboard</Text>
      <Text>Welcome, {user?.name}</Text>
      <Text style={styles.status}>Server Says: {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  status: { color: 'green', marginTop: 10 }
});