import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { clearCart, decrementQuantity, increaseQuantity } from '@/store/features/cartSlice';
import { Button } from '@/components/ui/button';
import { SaleProduct } from '@/api/manager/queries';
import { ProductSalePayload } from '@/api/manager/types';
import { toast } from '@/hooks/use-toast';

const CashierView: React.FC = () => {
    const items = useAppSelector((state: RootState) => state.cart.items);
    const dispatch = useAppDispatch();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(items.reduce((total, item) => total + item.price * item.Quantity, 0));
        console.log(totalPrice);
    });

    const { mutate: saleProduct } = SaleProduct.useMutation({
        onSuccess: () => {
            toast({
                title: "Success",
                description: `Sale Order Successfully`
            })
            dispatch(clearCart())
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `Error Sale Order: ${error.message}`,
                variant: "destructive",
            })
        },
    });

    const cashOutClick = () => {
        if (items.length === 0) {
            toast({
                title: "Error",
                description: "Cart is Empty",
                variant: "destructive"
            })
            return;
        }
    
        const payloads: ProductSalePayload[] = items.map(item => ({
            
            productId: item.productId,
            quantitySold: item.Quantity
        }));
        saleProduct(payloads as any);
    };
    return (
        <>
            <h1 className='text-center font-bold'>Cashier View</h1>
            { items.length === 0 ? (
                <div className='text-center text-red-500 font-bold'>Not have Your Order</div>
            ) : (
            <Table>
                <TableHeader className='bg-[#1a1f29]'>
                    <TableRow>
                        <TableHead className='text-center text-white'>Quantity Sold</TableHead>
                        <TableHead className='text-center text-white'>Price</TableHead>
                        <TableHead className='text-center text-white'>Subtotal</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.length > 0 && items.map((item) => (
                        <TableRow key={item.productId}>
                            <TableCell className='text-center'>
                                <div>
                                    <span onClick={() => dispatch(decrementQuantity(item))}><i className="pi pi-minus-circle" style={{ color: 'red' }}></i></span>
                                    <span className='font-semibold ml-2'>{item.Quantity}</span>
                                    <span onClick={() => dispatch(increaseQuantity(item))}><i className="pi pi-plus-circle ml-2" style={{ color: 'green' }}></i></span>
                                </div>
                            </TableCell>
                            <TableCell className='text-center font-semibold '>{item.price}$</TableCell>
                            <TableCell className='text-center font-semibold '>{ (item.price * item.Quantity) }$</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            )}
            <div className="flex justify-end">
                <span className="font-semibold mr-12">Total Price:</span>
                <span className="mr-2 text-center font-semibold">{totalPrice}$</span>
            </div>

            <Button className='font-bold bg-green-500 hover:bg-green-800 ml-4' onClick={cashOutClick}>Cash Out</Button>
        </>
    )
}

export default CashierView
