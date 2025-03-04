import { GetAllSalePayload } from "@/api/manager/types";
import { ColumnDef } from "@tanstack/react-table";

export const col: ColumnDef<GetAllSalePayload>[] = [
    {
        accessorKey: "SaleId ",
        header: () => <div className="text-center text-white"> No </div>,
        cell: ({ row }) => {
            return <div className="text-center font-bold" > {row.index + 1}. </div>;
        },
    },
    {
        accessorKey: "ProductId",
        header: () => <div className="text-center text-white"> ProductID </div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium" > {row.original.productId} </div>;
        },
    },
    {
        accessorKey: "QuantitySold",
        header: () => <div className="text-center text-white"> Quantity Sold </div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium" > {row.original.quantitySold} </div>;
        },
    },
    {
        accessorKey: "TotalPrice",
        header: () => <div className="text-center text-white"> Total Amount </div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium" > {row.original.totalPrice} </div>;
        },
    },
    {
        accessorKey: "TotalProfit ",
        header: () => <div className="text-center text-white"> Total Profit </div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium" > {row.original.totalProfit} </div>;
        },
    },
    {
        accessorKey: "SalesDate",
        header: () => <div className="text-center text-white"> Sale Date </div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium" > {row.original.salesDate} </div>;
            // const rawDate = row.getValue("salesDate") as string | number | Date; // Type Assertion
            // const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString() : "N/A"; // Formatting Date

            // return <div className="text-center font-medium">{formattedDate}</div>;
        },
    }
];