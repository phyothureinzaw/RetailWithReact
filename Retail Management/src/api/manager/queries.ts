import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import SaleService from './services'
import { GetAllSalePayload, ProductSalePayload, SaleReportPayload } from "./types";
// import { ApiResponse } from "@/share/type";

export const getAllSale = {
    useQuery: (opt?: UseQueryOptions<GetAllSalePayload[]>) =>
        useQuery({
            queryKey: ['getAllSale'],
            queryFn: SaleService.getAllSale,
            ...opt
        })
//     useQuery: (opt?: UseQueryOptions<GetAllSalePayload[]>) =>
//           useQuery<GetAllSalePayload[], Error>({
//               queryKey: ['getAllSale'],
//               queryFn: async () => {
//                   const response: ApiResponse<GetAllSalePayload[]> = await SaleService.getAllSale();
//                   return response.data;
//               },
//               ...opt
//           })
}

export const SaleProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, ProductSalePayload, any>) =>
        useMutation({
            mutationKey: ['saleProduct'],
            mutationFn: SaleService.saleProduct, // Use the service to create the product
            ...opt // Pass additional options if needed
        })
}

export const saleReport = {
    useQuery: (opt?: UseQueryOptions<SaleReportPayload>) =>
        useQuery({
            queryKey: ['saleReport'],
            queryFn: SaleService.saleReport,
            ...opt
        })
}