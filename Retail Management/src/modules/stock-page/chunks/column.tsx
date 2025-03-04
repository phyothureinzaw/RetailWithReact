import { CartPayload, GetAllProductyPayload, ProductDeletePayload, ProductUpdatePayload } from "@/api/product/types";
// import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { addToCart, decrementQuantity, increaseQuantity } from "@/store/features/cartSlice";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { ColumnDef } from "@tanstack/react-table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const columns = (
    editClick: (data: ProductUpdatePayload) => void,
    deleteClick: (data: ProductDeletePayload) => void
): ColumnDef<GetAllProductyPayload, CartPayload>[] => [
        {
            accessorKey: "ProductId",
            header: () => <div className="text-center font-bold text-white "> No </div>,
            cell: ({ row }) => {
                return <div className="text-center font-bold" > {row.index + 1}. </div>;
            },
        },
        {
            accessorKey: "ProductName",
            header: () => <div className="text-center font-bold text-white"> Product Name </div>,
            cell: ({ row }) => {
                return <div className="text-center font-bold " > {row.original.productName} </div>;
            },
        },
        {
            accessorKey: "Price",
            header: () => <div className="text-center font-bold text-white"> Price </div>,
            cell: ({ row }) => {
                return <div className="text-center " > {row.original.price}$ </div>;
            },
        },
        {
            accessorKey: "Stock",
            header: () => <div className="text-center font-bold text-white"> Stock </div>,
            cell: ({ row }) => {
                return <div className="text-center " > {row.original.stock} </div>;
            },
        },
        {
            accessorKey: "Profit",
            header: () => <div className="text-center font-bold text-white"> Profit</div>,
            cell: ({ row }) => {
                return <div className="text-center " > {row.original.profit} </div>;
            },
        },
        {
            id: "actions",
            header: () => <div className="text-center font-bold text-white"> Action </div>,
            cell: ({ row }) => {
                const product = row.original as GetAllProductyPayload;
                
                const dispatch = useAppDispatch();
                const items = useAppSelector((state: RootState) => state.cart?.items || [])

                return (
                    <>
                        <div className="flex flex-row justify-center">
                            {items.some((item: CartPayload) => item.productId === row.original.productId) ? (
                                <div className="">
                                    {(() => {
                                        const cartItem = items.find((item: CartPayload) => item.productId=== row.original.productId);

                                        return cartItem ? (
                                            <>
                                                <span
                                                    onClick={() => dispatch(decrementQuantity(cartItem))}
                                                    className="text-center"
                                                >
                                                    <i className="pi pi-minus-circle text-lg text-red-500"></i>
                                                </span>

                                                {/* Display Quantity */}
                                                <span className="text-center text-xl ml-2 font-semibold">{cartItem.Quantity}</span>

                                                <span
                                                    onClick={() => dispatch(increaseQuantity(cartItem))}
                                                    className="text-center"
                                                >
                                                    <i className="pi pi-plus-circle text-lg ml-2 text-green-500"></i>
                                                </span>
                                            </>
                                        ) : null;
                                    })()}
                                </div>
                            ) : (
                                <Button variant="outline"
                                    className="bg-white text-blue-500 p-2  hover:bg-blue-500 hover:text-white "
                                    onClick={() => dispatch(addToCart(row.original))}
                                >
                                    <i className="pi pi-cart-plus"></i>
                                    <span className="hidden md:block">Add To Cart</span>
                                </Button>
                            )}


                            <Button variant="outline" className="bg-white text-yellow-500 p-2 ml-2 hover:bg-yellow-500 hover:text-white" onClick={() => editClick(product)}>
                                <i className="pi pi-pen-to-square"></i>
                                <span className="hidden md:block">Edit</span>
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="bg-white text-red-500 p-2 ml-2 hover:bg-red-500 hover:text-white">
                                        <i className="pi pi-trash"></i>
                                        <span className="hidden md:block">Remove</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-center font-bold">Are You Sure want to Delete?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteClick(product)}>Confirm</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            {/* <Button className="bg-red-500 p-2 ml-2 hover:bg-red-800" onClick={() => deleteClick(product)}>
                            <i className="pi pi-trash"></i>
                            <span className="hidden md:block">Delete</span>
                        </Button> */}
                        </div>
                    </>
                )
            },
        },
    ];
