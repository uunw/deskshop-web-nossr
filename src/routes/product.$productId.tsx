import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import currency from "currency.js";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import logLevel from "loglevel";
import { useCallback } from "react";
import { TbStar } from "react-icons/tb";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { localCartAtom } from "@/libs/jotai";
import { productQueryOptions } from "@/libs/queryOptions";
import { cn } from "@/libs/utils";

export const Route = createFileRoute('/product/$productId')({
  parseParams: (params) => ({
    productId: z.number().int().parse(Number(params.productId)),
  }),
  stringifyParams: ({ productId }) => ({ productId: `${productId}` }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      productQueryOptions(opts.params.productId)
    ),
  component: ProductDetailComponent,
});

function ProductDetailComponent() {
  const params = Route.useParams();
  const productQuery = useSuspenseQuery(productQueryOptions(params.productId));
  const product = productQuery.data;
  const navigate = useNavigate();

  const [localCart, setLocalCart] = useAtom(localCartAtom);

  const handleAddProductToCart = useCallback(() => {
    if (!localCart) return;
    if (!params.productId) return;

    logLevel.debug(localCart);

    navigate({ to: "/cart" });
    const haveCurrentProductInCart = localCart.products.find(
      (v) => v.id === params.productId
    );
    if (haveCurrentProductInCart) return;

    setLocalCart({
      products: [...localCart.products, { id: params.productId, quantity: 1 }],
    });

    // logLevel.debug(localCart);
  }, [localCart, navigate, params.productId, setLocalCart]);

  if (!product) return <p>product not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <p>prodi</p>
      <p>{JSON.stringify(productQuery.data)}</p> */}

      {/* Image gallery */}
      {product.add_picture && (
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          {/* <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block"> */}
          <img
            src={product.add_picture}
            alt={product.add_desk}
            className="h-full w-full object-cover object-center rounded-lg"
          />
          {/* </div> */}
          {/* <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[1].src}
                alt={product.images[1].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[2].src}
                alt={product.images[2].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.images[3].src}
              alt={product.images[3].alt}
              className="h-full w-full object-cover object-center"
            />
          </div> */}
        </div>
      )}

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-current sm:text-3xl">
            {product.add_desk}
          </h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-current">
            {currency(product.add_price).format({ symbol: "฿" })}
          </p>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <TbStar
                    key={rating}
                    className={cn(
                      3 > rating ? "text-primary" : "text-slate-500",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{4} out of 5 stars</p>
              {/* <a
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {4000} reviews
              </a> */}

              <Label className="ml-3 text-sm font-medium text-primary">{`200 รีวิว`}</Label>
            </div>
          </div>

          <form className="mt-10">
            {/* <button
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to bag
            </button> */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  className="w-full px-8 py-3"
                  onClick={() => handleAddProductToCart()}
                >
                  {"เพิ่มลงในตะกร้า"}
                </Button>
              </TooltipTrigger>

              <TooltipContent>ไม่มีข้อมูลสินค้า</TooltipContent>
            </Tooltip>
          </form>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-current prose">
                {product.add_detail}
              </p>
            </div>
          </div>

          {/* <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="text-gray-400">
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          <div className="mt-10">
            <h2 className="text-sm font-medium text-current">Details</h2>

            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">{product.add_detail}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
