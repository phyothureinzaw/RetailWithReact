import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import 'primeicons/primeicons.css';
import { Button } from '@/components/ui/button';
import { decrementQuantity, increaseQuantity, removeFromCart } from '@/store/features/cartSlice';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const CartPage: React.FC = () => {
    const items = useAppSelector((state: RootState) => state.cart?.items || []);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const checkOutClick = () => {
        navigate("/cashier");
    }
    return (
        <>
            
            <h1 className='text-center text-3xl font-bold'>Cart Page!</h1>
            {items.length === 0 ? (

                <div className='flex justify-center items-center flex-col h-screen'>
                    {/* <img src="img/p2.avif" className='w-80 h-80' alt="" /> */}
                    {/* <FontAwesomeIcon icon={faCartShopping} className="mt-4" size="6x" /> */}
                    <p className='text-lg text-primary font-bold mt-4 border-solid border-[5px] border-red-500 p-5'>Your Cart is Empty!</p>
                </div>
            ) : (

                <Table>
                    <TableHeader className='bg-[#1a1f29]'>
                        <TableRow>
                            <TableHead className='text-center text-white'>No</TableHead>
                            <TableHead className='text-center text-white'>Product Name</TableHead>
                            <TableHead className='text-center text-white'>Price</TableHead>
                            <TableHead className='text-center text-white'>Quantity</TableHead>
                            <TableHead className='text-center text-white'>Remove</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length > 0 && items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className='text-center font-bold'>{index + 1}.</TableCell>
                                <TableCell className='text-center font-bold'>{item.productName}</TableCell>
                                <TableCell className='text-center font-bold'>{item.price}$</TableCell>
                                <TableCell className='text-center'>
                                    <div>
                                        <span onClick={() => dispatch(decrementQuantity(item))}><i className="pi pi-minus-circle" style={{ color: 'red' }}></i></span>
                                        <span className='font-semibold ml-2'>{item.Quantity}</span>
                                        <span onClick={() => dispatch(increaseQuantity(item))}><i className="pi pi-plus-circle ml-2" style={{ color: 'green' }}></i></span>
                                    </div>
                                </TableCell>
                                <TableCell className='text-center'>
                                    <Button onClick={() => item.productId && dispatch(removeFromCart(item.productId))} className='bg-red-500 hover:bg-500-red'><i className="pi pi-times-circle"></i></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">${calculateTotal().toFixed(2)}</TableCell>
                    </TableRow>
                </TableFooter> */}
                </Table>
            )}
            {items.length > 0 && (
                <div className="flex justify-center mt-4">
                    <Button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow"
                        onClick={checkOutClick}
                    >
                        Checkout
                    </Button>
                </div>
            )}
           
        </>
    );
};

export default CartPage;