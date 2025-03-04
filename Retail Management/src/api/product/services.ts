import axios from "axios"
import { GetAllProductyPayload, ProductAddPayload, ProductDeletePayload, ProductUpdatePayload } from "./types"
import { ApiResponse } from "@/share/type"

const baseUrl = '/Product'

const getAllProduct = async (): Promise<ApiResponse<GetAllProductyPayload[]>> => {
    const response = await axios.get<ApiResponse<GetAllProductyPayload[]>>(`${baseUrl}/GetAllProduct`)
    return response.data;
}

const addProduct = async (payload: ProductAddPayload): Promise<any> => {
    let response = await axios.post(`${baseUrl}/AddProduct`, payload);
    return response.data.message;
}

const updateProduct = async (payload: ProductUpdatePayload): Promise<any> => {
    let response = await axios.put(`${baseUrl}/UpdateProduct`, payload);
    return response.data.message;
}

const deleteProduct = async (payload: ProductDeletePayload): Promise<any> => {
    let response = await axios.delete(`${baseUrl}/DeleteProduct`, {data: payload});
    return response.data.message;
}

export default {getAllProduct, addProduct, updateProduct, deleteProduct}