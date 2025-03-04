export type GetAllSalePayload = {
    saleId: string
    productId: string
    quantitySold: number
    totalPrice: number
    totalProfit: number
    salesDate: string
}

export type ProductSalePayload = {
    productId: string
    quantitySold: number
}

export type SaleReportPayload = {
    totalPrice: string
    totalProfit: string
}