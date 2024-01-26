import { useSuspenseQuery } from "@tanstack/react-query";
import { FileRoute, Link } from "@tanstack/react-router";
import axios from "axios";
import currency from "currency.js";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import logLevel from "loglevel";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { TbMenu2, TbPhoto, TbScreenshot, TbTrash } from "react-icons/tb";
import { toast } from "sonner";

import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isNProgressIsAnimatingAtom } from "@/libs/jotai";
import {
  productsQueryOptions,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/libs/queryOptions";
import { ProductType } from "@/types/product.type";

export const Route = new FileRoute('/manage/product/scheduling_desk').createRoute({
  component: ManageProductSchedulingDeskComponent,
});

function ManageProductSchedulingDeskComponent() {
  const productQuery = useSuspenseQuery(productsQueryOptions());
  const productDeleteMutation = useDeleteProductMutation();
  const productUpdateMutation = useUpdateProductMutation();

  const { data: products } = productQuery;

  const [isProductUpdateFormDialogOpen, setIsProductUpdateFormDialogOpen] =
    useState(false);
  const [isProductDeleteAlertDialogOpen, setIsProductDeleteAlertDialogOpen] =
    useState(false);
  const [isNProgressIsAnimating, setIsNProgressIsAnimating] = useAtom(
    isNProgressIsAnimatingAtom
  );
  const [deleteProductId, setDeleteProductId] = useState(0);

  const updateProductForm = useForm<ProductType>({
    defaultValues: {
      id: 0,
      add_desk: "",
      add_color: "",
      add_detail: "",
      add_picture: "",
      add_price: 0,
    },
  });

  const handleClickUpdateButton = (productId: number) => {
    if (!products) return;

    updateProductForm.setValue("id", productId);

    const currentProduct = products.filter((p) => p.id === productId)[0];
    updateProductForm.setValue("id", currentProduct.id);
    updateProductForm.setValue("add_desk", currentProduct.add_desk);
    updateProductForm.setValue("add_picture", currentProduct.add_picture);
    updateProductForm.setValue("add_color", currentProduct.add_color);
    updateProductForm.setValue("add_detail", currentProduct.add_detail);
    updateProductForm.setValue("add_price", currentProduct.add_price);

    // logLevel.debug(updateProductId);
    setIsProductUpdateFormDialogOpen(true);
  };

  const handleClickDeleteButton = (productId: number) => {
    if (!products) return;

    logLevel.debug(productId);

    const currentProduct = products.filter((p) => p.id === productId)[0];
    setDeleteProductId(currentProduct.id);
    logLevel.debug(currentProduct);

    setIsProductDeleteAlertDialogOpen(true);
  };

  const onUpdateProduct = updateProductForm.handleSubmit(async (data) => {
    logLevel.debug(data);

    const res = await productUpdateMutation.mutateAsync(data);

    logLevel.debug(res);
    toast(
      res.add_desk
        ? `แก้ไขข้อมูลสินค้า (${res.add_desk}) เสร็จสิ้น`
        : "แก้ไขข้อมูลสินค้าเสร็จสิ้น"
    );
    await productQuery.refetch();

    setIsProductUpdateFormDialogOpen(false);
  });

  const onDeleteProduct = useCallback(async () => {
    const res = await productDeleteMutation.mutateAsync(deleteProductId);
    if (res !== "OK") return;

    setIsProductDeleteAlertDialogOpen(false);

    toast("ลบข้อมูลสินค้าเสร็จสิ้น");

    await productQuery.refetch();
  }, [deleteProductId, productDeleteMutation, productQuery]);

  return (
    <motion.div>
      <p>Scheduling desk</p>

      <Button asChild>
        <Link to="/manage/product/add_desk">{"เพิ่มสินค้า"}</Link>
      </Button>

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{"ลำดับ"}</TableHead>
            <TableHead>{"ชื่อสินค้า"}</TableHead>
            <TableHead>{"รูปสินค้า"}</TableHead>
            <TableHead>{"รายระเอียดสินค้า"}</TableHead>
            <TableHead>{"สี"}</TableHead>
            <TableHead>{"ราคาสินค้า"}</TableHead>
            <TableHead className="text-right">{"จัดการ"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!products ? (
            <TableRow>
              <TableCell colSpan={3}>{"no product"}</TableCell>
            </TableRow>
          ) : (
            <>
              {products.map((product, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.add_desk}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {product.add_picture ? (
                          <a href={product.add_picture} target="_blank">
                            <TbPhoto className="h-5 w-auto" />
                          </a>
                        ) : (
                          <div>
                            <TbScreenshot
                              className="h-5 w-auto"
                              // title="ไม่มีรูปสินค้า"
                            />
                          </div>
                        )}
                      </TooltipTrigger>

                      <TooltipContent>
                        {product.add_picture ? (
                          // <p>{"ดูรูปสินค้า"}</p>
                          <img
                            src={product.add_picture}
                            alt={product.add_desk}
                            className="h-48 w-auto"
                          />
                        ) : (
                          <p className="text-red-600">{"ไม่มีรูปสินค้า"}</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="truncate inline-block w-80 line-clamp-1">
                    {product.add_detail}
                  </TableCell>
                  <TableCell>{product.add_color}</TableCell>
                  <TableCell>
                    {currency(product.add_price).format({ symbol: "฿" })}
                  </TableCell>
                  {/* <TableCell className="text-right">
                    <Button color="yellow">{"แก้ไขข้อมูล"}</Button>
                  </TableCell> */}
                  <TableCell className="text-right space-x-2">
                    {/* <Button
                      // className=
                      type="button"
                      onClick={() => handleClickUpdateButton(product.id)}
                    >
                      {"แก้ไขข้อมูล"}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleClickDeleteButton(product.id)}
                    >
                      {"ลบข้อมูล"}
                    </Button> */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button" variant="outline" size="icon">
                          <TbMenu2 className="h-4 w-auto" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>{"จัดการสินค้า"}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleClickUpdateButton(product.id)}
                        >
                          {"แก้ไข"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleClickDeleteButton(product.id)}
                        >
                          <TbTrash />
                          {"ลบ"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>

        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>

      <Dialog
        open={isProductUpdateFormDialogOpen}
        onOpenChange={(open) => {
          setIsProductUpdateFormDialogOpen(open);
          updateProductForm.reset();
        }}
      >
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"แก้ไขข้อมูลสินค้า"}</DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>

          <Form {...updateProductForm}>
            <form
              onSubmit={onUpdateProduct}
              className="space-y-8"
              id="product-update-form"
            >
              <FormField
                control={updateProductForm.control}
                name="add_desk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"ชื่อสินค้า"}</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>{"รูปภาพสินค้า"}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isNProgressIsAnimating}
                    type="file"
                    accept="image/png, image/jpeg"
                    size={100 * 1000000}
                    onChange={async (evt) => {
                      const files = evt.currentTarget.files;
                      if (!files) return;
                      setIsNProgressIsAnimating(true);
                      const formData = new FormData();
                      formData.set("uploadType", "0");
                      formData.set("file", files[0]);

                      try {
                        const res = await axios.post(
                          "https://up.m1r.ai/upload",
                          formData
                        );

                        logLevel.debug(res.data);
                        updateProductForm.setValue(
                          "add_picture",
                          String(res.data.url)
                        );

                        setIsNProgressIsAnimating(false);
                      } catch (err) {
                        logLevel.error(err);
                        setIsNProgressIsAnimating(false);
                      }

                      // logLevel.debug(files[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  {"ไฟล์รูปภาพ jpg หรือ png ขนาดไม่เกิน 100MB"}
                </FormDescription>
                <FormMessage />
              </FormItem>

              {updateProductForm.watch("add_picture") && (
                <div className="w-48 h-auto">
                  <img
                    src={
                      updateProductForm.watch("add_picture") ??
                      "https://placehold.co/600x400.png"
                    }
                    alt={updateProductForm.watch("add_desk")}
                  />
                </div>
              )}
              {isNProgressIsAnimating && (
                <div>
                  <p>{"กำลังอัพโหลดรูปภาพ..."}</p>
                </div>
              )}

              <FormField
                control={updateProductForm.control}
                name="add_detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"รายระเอียดสินค้า"}</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="shadcn" {...field} /> */}
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={updateProductForm.control}
                name="add_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"สี"}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={updateProductForm.control}
                name="add_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"ราคา (บาท)"}</FormLabel>
                    <FormControl>
                      <Input type="number" step={0.1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                disabled={isNProgressIsAnimating}
              >
                {"ยกเลิก"}
              </Button>
            </DialogClose>

            <Button
              type="submit"
              form="product-update-form"
              disabled={isNProgressIsAnimating}
            >
              {"บันทึกข้อมูล"}
            </Button>
            {/* <Button type="submit">{"บันทึกข้อมูล"}</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isProductDeleteAlertDialogOpen}
        onOpenChange={(open) => {
          setIsProductDeleteAlertDialogOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{"ต้องการลบสินค้าหรือไม่?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {`คุณต้องการลบสินค้าหรือไม่ สินค้าดังกล่าวจะถูกลบออกจากระบบ`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{"ยกเลิก"}</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDeleteProduct()}>
              {"ลบสินค้า"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
