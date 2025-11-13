import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveToken(tokenData) {
  await AsyncStorage.setItem('token', JSON.stringify(tokenData));
}

export async function getToken() {
  const data = await AsyncStorage.getItem('token');
  return data ? JSON.parse(data) : null;
}

export async function removeToken() {
  await AsyncStorage.removeItem('token');
}

export const setStorageItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error('Error saving to storage:', error);
        return false;
    }
};

export const getStorageItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.error('Error reading from storage:', error);
        return null;
    }
};

export const removeStorageItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from storage:', error);
        return false;
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        console.error('Error clearing storage:', error);
        return false;
    }
};