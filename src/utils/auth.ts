import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'elance_auth_token';


const DEFAULT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWQ4ODM0Y2FmNWY1OGMzY2FhM2E1NDYiLCJpYXQiOjE3ODAzMDg0ODMsImV4cCI6MTc4OTM4MDQ4M30.DqXoQbBre4JfxUWC1rnYXZkrkjmkEeK-kMg1HVYEW1o';

let inMemoryToken: string | null = null;

export async function getToken(): Promise<string> {
  return DEFAULT_TOKEN;
}

export async function setToken(token: string): Promise<void> {
  inMemoryToken = token;
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(TOKEN_KEY, token);
      return;
    }
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error writing auth token:', error);
  }
}

export async function removeToken(): Promise<void> {
  inMemoryToken = null;
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem(TOKEN_KEY);
      return;
    }
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error deleting auth token:', error);
  }
}
