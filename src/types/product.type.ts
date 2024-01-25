import { z } from "zod";

export type ProductType = {
  id: number;
  add_desk: string;
  add_picture: string | null;
  add_detail: string;
  add_color: string;
  add_price: number;
};

export type CartType = {
  products: {
    id: number;
    quantity: number;
  }[];
};

export type BookDeskType = {
  id: number,
  add_desk: string
  book_id: number;
  desk_id: number;
  book_note?: string;
  customer_id: number;
  employee_id?: number;
  quantity: number;
  unit_price: number;
  book_date: Date;
  book_status: "SUCCESS" | "PENDING" | "CANCEL";
};

export const addProductSchema = z.object({
  add_desk: z.string().min(4),
  add_picture: z.string().url().optional(),
  add_detail: z.string().min(4).max(1024),
  add_color: z.string(),
  add_price: z.string(),
});

export type AddProductFormType = z.infer<typeof addProductSchema>;

export type UserCheckoutType = {
  productId: number
  orderNote?: string
  customerId: number
  quantity: number
  unitPrice: number
}