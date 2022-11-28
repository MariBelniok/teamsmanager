import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";

export async function GroupsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
  
    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw error;
  }
}