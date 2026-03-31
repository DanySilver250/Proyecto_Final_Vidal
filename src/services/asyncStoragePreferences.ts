import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "@app:";

/** Persistencia local no sensible (preferencias, cachés ligeras, etc.). */

export async function setPreference(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(PREFIX + key, value);
  } catch (error) {
    console.error("Error saving preference:", error);
  }
}

export async function getPreference(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(PREFIX + key);
  } catch (error) {
    console.error("Error getting preference:", error);
    return null;
  }
}

export async function removePreference(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(PREFIX + key);
  } catch (error) {
    console.error("Error removing preference:", error);
  }
}