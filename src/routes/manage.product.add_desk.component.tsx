import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useAtom } from "jotai";
import logLevel from "loglevel";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { isNProgressIsAnimatingAtom } from "@/libs/jotai";
import { useCreateProductMutation } from "@/libs/queryOptions";
import { AddProductFormType, addProductSchema } from "@/types/product.type";

// export const Route = new FileRoute('/manage/product/add_desk').createRoute({
//   component: ManageProductAddDeskComponent,
// });

export const component = function ManageProductAddDeskComponent() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // const addProductMutation = useMutation({
  //   mutationKey: ["add_product"],
  //   mutationFn: async (data: AddProductFormType) => {
  //     const formData = new FormData();

  //     formData.set("add_desk", data.add_desk);
  //     if (data.add_picture) {
  //       formData.set("add_picture", data.add_picture);
  //     }
  //     formData.set("add_detail", data.add_detail);
  //     formData.set("add_color", data.add_color);
  //     formData.set("add_price", currency(data.add_price).toString());

  //     const res = await axios.post(
  //       "https://waraporn.cmtc.ac.th/student/student65/u65301280011/IKEA-DeskShop/api/add_product.php",
  //       formData
  //     );

  //     return res.data;
  //   },
  // });
  const createProductMutation = useCreateProductMutation();

  const [isNProgressIsAnimating, setIsNProgressIsAnimating] = useAtom(
    isNProgressIsAnimatingAtom
  );
  // const [isUploadingProductImage, setIsUploadingProductImage] = useState(false);

  const addProductForm = useForm<AddProductFormType>({
    resolver: zodResolver(addProductSchema),
  });

  const handleAddProduct = addProductForm.handleSubmit(async (data) => {
    const product = await createProductMutation.mutateAsync(data);

    logLevel.debug(product);

    toast({
      title: "เพิ่มสินค้าเสร็จสิ้น",
    });

    navigate({ to: "/manage/product/scheduling_desk" });
  });

  return (
    <>
      <Button asChild>
        <Link to="/manage/product/scheduling_desk">{"กลับหน้าเดิม"}</Link>
      </Button>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>{"เพิ่มสินค้า"}</CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>

        <CardContent>
          <Form {...addProductForm}>
            <form
              onSubmit={handleAddProduct}
              className="space-y-8"
              id="add-product-form"
            >
              <FormField
                control={addProductForm.control}
                name="add_desk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"ชื่อสินค้า"}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>{"รูปสินค้า"}</FormLabel>
                <FormControl>
                  <Input
                    type="file"
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
                        addProductForm.setValue(
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

              {addProductForm.watch("add_picture") && (
                <div className="w-48 h-auto">
                  <img src={addProductForm.watch("add_picture")} />
                </div>
              )}
              {isNProgressIsAnimating && (
                <div>
                  <p>{"กำลังอัพโหลดรูปภาพ..."}</p>
                </div>
              )}

              <FormField
                control={addProductForm.control}
                name="add_detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"คำอธิบายสินค้า"}</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addProductForm.control}
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
                control={addProductForm.control}
                name="add_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"ราคา (บาท)"}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <p>{currency(addProductForm.watch("add_price")).value}</p>
              <p>{currency(addProductForm.watch("add_price")).toString()}</p> */}

              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              addProductForm.reset();
            }}
          >
            {"ล้างข้อมูล"}
          </Button>
          <Button type="submit" form="add-product-form">
            {"เพิ่มสินค้า"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
