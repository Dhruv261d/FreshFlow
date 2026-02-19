import { Alert } from 'react-native';

const BASE_URL = 'http://10.0.2.2:5000/api';

export const fetchProtectedData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/protected/list-harvest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, //
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (response.ok) {
      return result.message; // Should return "Farmer access granted"
    } else {
      Alert.alert("Access Denied", result.message);
      return null;
    }
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};