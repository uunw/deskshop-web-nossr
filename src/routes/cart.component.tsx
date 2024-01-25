import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import currency from "currency.js";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TbCheck } from "react-icons/tb";
import { toast } from "sonner";

import DebugOutput from "@/components/debug-output";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { localCartAtom, userSessionAtom } from "@/libs/jotai";
import {
  productQueryOptions,
  useUserCheckoutMutation,
} from "@/libs/queryOptions";

export const component = function UserCartComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [localCart, setLocalCart] = useAtom(localCartAtom);
  const localCartProduct = localCart.products[0] ?? [];
  const [userSession] = useAtom(userSessionAtom);

  const productQuery = useSuspenseQuery(
    productQueryOptions(localCartProduct.id)
  );
  const product = productQuery.data;
  // const products = productsQuery.data.filter((p) => p.id === localCart.products.);

  const userCheckoutMutation = useUserCheckoutMutation();

  const [subTotal, setSubtotal] = useState(0);
  const [freight] = useState(200); // ค่าส่ง
  const [totalPrice, setTotalPrice] = useState(0);

  const taxValue = (subTotal * 7) / 100;

  useEffect(() => {
    if (!productQuery.data) return;

    setSubtotal(productQuery.data.add_price * localCartProduct.quantity);
    setTotalPrice(subTotal + taxValue + freight);
  }, [
    freight,
    localCartProduct.quantity,
    productQuery.data,
    subTotal,
    taxValue,
  ]);

  const handleCheckOut = useCallback(async () => {
    if (!userSession) return;
    if (!product) return;

    const res = await userCheckoutMutation.mutateAsync({
      productId: product.id,
      quantity: localCartProduct.quantity,
      customerId: userSession.id,
      unitPrice: totalPrice,
    });

    if (res !== "OK") {
      return;
    }

    toast("สั่งจองโต๊ะทำงานเสร็จสิ้น");
    navigate({ to: "/user/order" });

    setLocalCart({ products: [] });
  }, [
    localCartProduct.quantity,
    navigate,
    product,
    setLocalCart,
    totalPrice,
    userCheckoutMutation,
    userSession,
  ]);

  if (!product) {
    return <p>{t("productNotFound", "Product not found")}</p>;
  }

  return (
    <>
      <DebugOutput>{JSON.stringify(localCart)}</DebugOutput>

      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-current sm:text-4xl">
          {t("cart", "Cart")}
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 dkw">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2
              id="cart-heading"
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: "hidden",
                clip: "rect(0,0,0,0)",
                whiteSpace: "nowrap",
                borderWidth: 0,
              }}
            >
              Items in your shopping cart
            </h2>

            <ul role="list" className="acc acg border-y border-current">
              <li className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img
                    // src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg"
                    src={
                      product.add_picture ?? "https://placehold.co/400x400.png"
                    }
                    alt="Front of men's Basic Tee in sienna."
                    className="h-24 w-24 rounded object-cover object-center sm:h-48 sm:w-48"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link
                            to="/product/$productId"
                            params={{ productId: product.id }}
                            className="font-medium text-current bla"
                          >
                            {product.add_desk}
                            {/* asd */}
                          </Link>
                        </h3>
                      </div>

                      <div className="mt-1 flex text-sm">
                        <p className="text-current">{product.add_color}</p>
                        {/* <p className="ml-4 border-l border-l-current pl-4 text-current">
                          Large
                        </p> */}
                      </div>
                      <p className="mt-1 text-sm font-medium text-current">
                        {currency(product.add_price).format({
                          symbol: "฿",
                        })}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <Select
                        defaultValue={String(localCartProduct.quantity)}
                        onValueChange={(v) => {
                          setLocalCart({
                            products: [
                              {
                                id: Number(localCartProduct.id),
                                quantity: Number(v),
                              },
                            ],
                          });
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="จำนวน" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <SelectItem key={n} value={n.toString()}>
                              {n}
                            </SelectItem>
                          ))}
                          {/* <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <p className="mt-4 flex text-sm text-current">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="nz sb up axx"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      ></path>
                    </svg> */}
                    <TbCheck className="h-5 w-auto shrink-0 text-green-400" />
                    <span className="ml-2">{"มีในสต็อก"}</span>
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-primary/10 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-xl font-medium text-current"
            >
              Order summary
            </h2>
            <dl className="mt-6 abw">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-current">{"ราคาสินค้า"}</dt>
                <dd className="text-sm font-medium text-current">
                  {currency(subTotal).format({
                    symbol: "฿",
                  })}
                </dd>
              </div>

              <div className="flex items-center justify-between border-t border-t-current pt-4">
                <dt className="flex items-center text-sm text-current">
                  <span>{"ค่าส่ง"}</span>
                </dt>
                <dd className="text-sm font-medium text-current">
                  {currency(freight).format({ symbol: "฿" })}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-t-current pt-4">
                <dt className="text-sm text-current">
                  <span>{"หักภาษี (7%)"}</span>
                </dt>
                <dd className="text-sm font-medium text-current">
                  {currency(taxValue).format({ symbol: "฿" })}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-t-current pt-4">
                <dt className="text-sm text-current">{"ราคารวม"}</dt>
                <dd className="text-sm font-medium text-current">
                  {currency(totalPrice).format({ symbol: "฿" })}
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              {/* <button
                type="submit"
                className="tn adu aez agy ajr ari arz avy awe bah bbn biv bmz bne bnq bog bok"
              >
                Checkout
              </button> */}

              <Button type="button" className="w-full" onClick={handleCheckOut}>
                {"จองสินค้า"}
              </Button>
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

// export const Route = new FileRoute('/cart').createRoute().update({
//   component: UserCartComponent,
// });
