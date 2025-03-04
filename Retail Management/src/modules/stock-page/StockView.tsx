import { DeleteProduct, getProductList } from "@/api/product/queries";
import { ProductDeletePayload, ProductUpdatePayload } from "@/api/product/types";
import ProductDialog from "@/components/Dialog/ProductDialog";
import { columns } from "@/modules/stock-page/chunks/column";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/store";
import { totalQuantity } from "@/store/features/cartSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";


const StockView = () => {
  const { data: products, isFetching, isLoading, isError, error } = getProductList.useQuery();
  const queryClient = useQueryClient();

//   useEffect(() => {
//     if(products){
//         console.log(`products : ${products[0].Price}`)
//     }
//   })

  // const [importData, setImportData] = useState<GetAllProductyPayload[]>([]);

  const [productDialog, setProductDialog] = useState({
    isEdit: false,
    isOpen: false,
    data: null as ProductUpdatePayload | null,
  });

  const addClick = () => {
    setProductDialog({ isEdit: false, isOpen: true, data: null });
  };

  const editClick = (data: ProductUpdatePayload) => {
    setProductDialog({ isEdit: true, isOpen: true, data });
  };

  const handleClose = () => {
    setProductDialog({ isEdit: false, isOpen: false, data: null });
  };

  const { mutate: deleteProduct } = DeleteProduct.useMutation({
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteProduct"] }); // Refresh product list
      toast({
        title: "Product Deleted successfully",
      });
      handleClose();
    },
  });

  const deleteClick = (data: ProductDeletePayload) => {
    deleteProduct(data);
  };

  const navigate = useNavigate();

  let cartItems = useAppSelector(totalQuantity) || 0;

  const cartClick = () => {
    navigate("/cart");
  }

  const exportClick = () => {
    if (!products || products.length === 0) {
      console.error("No data available to export.");
      return;
    }
    // Ensure data is formatted correctly before exporting
    const formattedProducts = products.map(product => ({
      "ProductId": product.productId,
      "ProductName": product.productName,
      "Price": product.price,
      "Stock": product.stock,
      "Profit ": product.profit
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedProducts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "ExportData.xlsx");
  };

  // Import Excel File
  // const importFromExcel = (event) => {
  //   const files = event.target.files;
  //   if (files.length) {
  //     const file = files[0];
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const wb = read(event.target?.result);

  //       const sheets = wb.SheetNames;
  //       if (sheets.length) {
  //         const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
  //         // console.table(rows);
  //         setImportData(rows);
  //       }
  //     }
  //     reader.readAsArrayBuffer(file);
  //   }
  // };


  return (
    <div className="p-4  ">
      <h1 className="text-center text-3xl font-bold">Stock <span className="text-blue-500">Menu</span></h1>
      <div className="flex flex-row mt-2">
        <Button className="bg-green-500 hover:bg-green-800" onClick={addClick}>+ADD</Button>
        {/* <Input type="file" name="file" className="w-50 p-2 ml-4" accept=".xlsx, .xls" onChange={importFromExcel} /> */}
        {/* <Button className="bg-gray-500 hover:bg-gray-800 ml-4" onClick={importClick}>Import</Button> */}
        <Button className="bg-blue-500 hover:bg-blue-800 ml-4" onClick={exportClick}>Export</Button>
        {/* CartItems */}
        <i
          className="pi pi-cart-plus text-3xl relative text-blue-500 hover:text-blue-800 transition-colors duration-200 ml-24"
          onClick={cartClick}
        >
          <span className="absolute text-white text-xs font-semibold px-2 py-1 rounded-full bg-green-500 -top-2 -right-3 shadow-lg border-2 border-white">
            {cartItems}
            
          </span>
        </i>

        {/* {importData.length > 0 && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h2 className="font-semibold mb-2">Imported Data</h2>
            <pre className="text-sm">{JSON.stringify(importData, null, 2)}</pre>
          </div>
        )} */}

      </div>



      {productDialog.isOpen && (
        <div>
          <h2>{productDialog.isEdit ? "Update Product" : "Add Product"}</h2>
          {/* Add your product form here */}
        </div>
      )}

      {/* Loading State */}
      {isFetching && <p className="text-center">Loading...</p>}

      {/* Error State */}
      {isError && <p className="text-center text-red-500 font-semibold">An error has occurred: {error?.message}</p>}


      {/* Data Table */}
      <DataTable  columns={columns(editClick, deleteClick)} data={products ?? []} loading={isLoading} />
      <ProductDialog dialogData={productDialog} handleClose={handleClose} />
    </div>
  );
};

export default StockView;

