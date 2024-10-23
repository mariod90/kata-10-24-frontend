import {AxiosError} from "axios";

export const getErrorAxios = (error: any): string => {
    const errorMsg = (error as AxiosError)?.response?.data || (error as AxiosError).message;
    return Object.keys(errorMsg).length > 0 ? JSON.stringify(errorMsg) : String(errorMsg)
}
