import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProductAddPayload, ProductUpdatePayload } from '@/api/product/types'
import { useQueryClient } from '@tanstack/react-query'
import { AddProduct, UpdateProduct } from '@/api/product/queries'
import { toast } from '@/hooks/use-toast'

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Productname must be at least 2 characters.",
  }),
  price: z.number().min(0, {
    message: "Price must be greater than zero number.",
  }),
  stock: z.number().min(0, {
    message: "Stock must be greater than zero number.",
  }),
  profit: z.number().min(0, {
    message: "Profit per item must be greater than zero number.",
  }),
})

interface ProductDialogProps {
  dialogData: {
    isEdit: boolean;
    isOpen: boolean;
    data: ProductUpdatePayload | null;
  };
  handleClose: () => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({ dialogData, handleClose }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      price: 0,
      stock: 0,
      profit: 0,
    },
  });

  // ✅ Define add mutation
  const { mutate: addProduct } = AddProduct.useMutation({
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] }); // Refresh product list
      toast({
        title: "Product Added successfully",
      });
      handleClose();
    },
  });

  // ✅ Define Update Mutation
  const { mutate: updateProduct } = UpdateProduct.useMutation({
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      toast({
        title: "Product Updated successfully",
      });
      handleClose();
    },
  });


  useEffect(() => {
    if (dialogData.isEdit && dialogData.data) {
      reset({
        productName: dialogData.data.productName || "",
        price: dialogData.data.price || 0,
        stock: dialogData.data.stock || 0,
        profit: dialogData.data.profit || 0,
      });
    } else {
      reset({
        productName: "",
        price: 0,
        stock: 0,
        profit: 0,
      });
    }
  }, [dialogData, reset]);


  // ✅ Handle Form Submission
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      if (dialogData.isEdit) {
        updateProduct({ ...dialogData.data, ...formData } as ProductUpdatePayload);
      } else {
        addProduct(formData as ProductAddPayload);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Dialog open={dialogData.isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogData.isEdit ? "Update Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="productName" className="text-right">Product Name</Label>
                <Input id="productName" {...register("productName")} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input id="price" type="number" {...register("price", { valueAsNumber: true })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">Stock</Label>
                <Input id="stock" type="number" {...register("stock", { valueAsNumber: true })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="profitPerItem" className="text-right">Profit</Label>
                <Input id="profitPerItem" type="number" {...register("profit", { valueAsNumber: true })} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{dialogData.isEdit ? "Update" : "Save"}</Button>
              <Button type="button" onClick={handleClose}>Close</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProductDialog
