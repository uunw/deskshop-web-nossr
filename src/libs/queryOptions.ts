import { queryOptions, useMutation } from "@tanstack/react-query";
import axios, { HttpStatusCode } from "axios";
import currency from "currency.js";
import logLevel from "loglevel";

import { AddProductFormType, BookDeskType, ProductType, UserCheckoutType } from "@/types/product.type";

import { apiUrl } from "./utils";

export const productsQueryOptions = (id?: string[]) =>
  queryOptions({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axios.get(apiUrl + "get_all_product.php", {});
      logLevel.debug(id)

      return res.data as ProductType[];
    },
  });

export const productQueryOptions = (productId: number) =>
  queryOptions({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) return null;

      const formData = new FormData();
      formData.set("id", String(productId));

      const res = await axios.post(apiUrl + "get_product.php", formData);
      if (res.status === HttpStatusCode.NotFound) return null;
      if (res.data === "PRODUCT_NOT_FOUND") return null;

      return res.data as ProductType;
    },
  });

export const productOrdersQueryOptions = () =>
  queryOptions({
    queryKey: ["product_orderes"],
    queryFn: async () => {
      const res = await axios.get(apiUrl + "get_all_book.php");
      // logLevel.debug(res.data);

      return res.data;
    },
  });

export const productOrderQueryOptions = (orderId: number) =>
  queryOptions({
    queryKey: ["product_order", orderId],
    queryFn: async () => {
      const formData = new FormData();
      formData.set('order_id', String(orderId));

      const res = await axios.post(apiUrl + "get_book.php", formData);
      // logLevel.debug(res.data);

      return res.data;
    },
  });

export const userOrderesQueryOptions = (userId?: number) => queryOptions({
  queryKey: ['user_orderes', userId],
  queryFn: async () => {
    if(!userId) return [];

    const formData = new FormData();
    formData.set('customer_id', String(userId));

    const res = await axios.post(apiUrl + 'get_order.php', formData);

    return res.data as BookDeskType[];
  }
})

export const useCreateProductMutation = () => {
  return useMutation({
    mutationKey: ["create_product"],
    mutationFn: async (data: AddProductFormType) => {
      const formData = new FormData();

      formData.set("add_desk", data.add_desk);
      if (data.add_picture) {
        formData.set("add_picture", data.add_picture);
      }
      formData.set("add_detail", data.add_detail);
      formData.set("add_color", data.add_color);
      formData.set("add_price", currency(data.add_price).toString());

      const res = await axios.post(apiUrl + "add_product.php", formData);

      return res.data;
    },
  });
};

export const useDeleteProductMutation = () => {
  return useMutation({
    mutationKey: ["delete_product"],
    mutationFn: async (productId: number) => {
      logLevel.debug("deleting product...");
      const formData = new FormData();

      formData.set("id", String(productId));

      const res = await axios.post(apiUrl + "delete_product.php", formData);
      // logLevel.debug(res.data);

      return res.data as string;
    },
  });
};

export const useUpdateProductMutation = () => {
  return useMutation({
    mutationKey: ["update_product"],
    mutationFn: async (data: ProductType) => {
      logLevel.debug("updating product...");
      const formData = new FormData();

      formData.set("id", String(data.id));
      formData.set("add_desk", data.add_desk);
      formData.set("add_detail", data.add_detail);
      if (data.add_picture) {
        formData.set("add_picture", data.add_picture);
      }
      formData.set("add_color", data.add_color);
      formData.set("add_price", String(data.add_price));

      const res = await axios.post(apiUrl + "update_product.php", formData);
      // logLevel.debug(res.data);

      return res.data;
    },
  });
};

export const useAcceptOrderMutation = () => {
  return useMutation({
    mutationKey: ['accept_order'],
    mutationFn: async (orderId: number) => {
      logLevel.debug('accept order mutation', orderId);
      const formData = new FormData();
      formData.set('order_id', String(orderId));

      const res = await axios.post(apiUrl + 'accept_order.php', formData);

      return res.data;
    }
  })
}

export const useCancelOrderMutation = () => {
  return useMutation({
    mutationKey: ['cancel_order'],
    mutationFn: async (orderId: number) => {
      logLevel.debug('cancel order mutation', orderId);
      const formData = new FormData();
      formData.set('order_id', String(orderId));

      const res = await axios.post(apiUrl + 'cancel_order.php', formData);

      return res.data;
    }
  })
}

export const useUserCheckoutMutation = () => {
  return useMutation({
    mutationKey: ["user_checkout"],
    mutationFn: async (data: UserCheckoutType) => {
      logLevel.debug('checkout');
      
      const formData = new FormData();

      formData.set("product_id", String(data.productId));
      formData.set("customer_id", String(data.customerId));
      formData.set("quantity", String(data.quantity));
      formData.set("unit_price", String(data.unitPrice));

      if (data.orderNote) {
        formData.set("order_note", data.orderNote);
      }

      const res = await axios.post(apiUrl + "checkout.php", formData);
      // logLevel.debug(res.data);

      return res.data;
    },
  });
};