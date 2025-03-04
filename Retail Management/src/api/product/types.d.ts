import exp from "constants"

export type GetAllProductyPayload = {
    productId : string
    productName : string
    stock : number
    price : number
    profit : number
}

export type ProductAddPayload = {
    // productId : string
    stock : number
    price : number
    profit : number
}

export type ProductUpdatePayload = {
    productId : string
    productName : string
    stock : number
    price : number
    profit : number
}

export type ProductDeletePayload = {
    productId : string
}

export type CartPayload = {
    productId: string
    productName: string
    price : number
    Quantity: number
    stock : number
}