import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetAllProductyPayload, ProductAddPayload, ProductDeletePayload, ProductUpdatePayload } from "./types";
import ProductService from './services'
import { ApiResponse } from "@/share/type";

export const getProductList = {
  useQuery: (opt?: UseQueryOptions<GetAllProductyPayload[]>) =>
      useQuery<GetAllProductyPayload[], Error>({
          queryKey: ['getAllProducts'],
          queryFn: async () => {
              const response: ApiResponse<GetAllProductyPayload[]> = await ProductService.getAllProduct();
              return response.data;
          },
          ...opt
      })
}

export const AddProduct = {
  useMutation: (opt?: UseMutationOptions<any, Error, ProductAddPayload, any>) =>
    useMutation({
      mutationKey: ['addProduct'],
      mutationFn: ProductService.addProduct, // Use the service to create the product
      ...opt // Pass additional options if needed
    })
}

export const UpdateProduct = {
  useMutation: (opt?: UseMutationOptions<any, Error, ProductUpdatePayload, any>) =>
    useMutation({
      
      mutationKey: ['updateProduct'],
      mutationFn: ProductService.updateProduct, // Use the service to create the product
      ...opt // Pass additional options if needed
    })
}

export const DeleteProduct = {
  useMutation: (opt?: UseMutationOptions<any, Error, ProductDeletePayload, any>) =>
    useMutation({
      mutationKey: ['deleteProduct'],
      mutationFn: ProductService.deleteProduct, // Use the service to create the product
      ...opt // Pass additional options if needed
    })
}