//importera Axios här
import axios from "axios";

//Utför din const get async med response och return av response data

export const get = async <T>(url: string): Promise<T> => {
    const response = await axios.get(url);
    return response.data;
};