import AsyncStorage from "@react-native-async-storage/async-storage";

export const URL_ONE = 'localhost:3001';
export const URL_TWO = '192.168.0.115:3001';

export const URL_THREE = async () => {
    return await AsyncStorage.getItem('server').then((resp) => (resp))
}