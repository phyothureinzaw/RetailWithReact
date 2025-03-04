import axios from "axios";
import { GetAllSalePayload, ProductSalePayload, SaleReportPayload } from "./types";

const baseUrl = '/Sale'

const getAllSale = async (): Promise<GetAllSalePayload[]> => {
    let response = await axios.get(`${baseUrl}/GetAllSale`);
    return response.data.data;
}

const saleProduct = async (payload: ProductSalePayload): Promise<any> => {
    let response = await axios.post(`${baseUrl}/SellProduct`, payload);
    return response.data.message;
}

const saleReport = async (): Promise<SaleReportPayload> => {
    let response = await axios.get(`${baseUrl}/SaleReport`);
    return response.data;
}

export default {saleProduct, getAllSale, saleReport}