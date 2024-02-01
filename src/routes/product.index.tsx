import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import currency from "currency.js";
import { motion } from "framer-motion";
import { z } from "zod";

import { productsQueryOptions } from "@/libs/queryOptions";

export const Route = createFileRoute("/product/")({
  validateSearch: z.object({
    searchQuery: z.string().optional(),
  }),

  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(productsQueryOptions()),
  component: ProductComponent,
});

function ProductComponent() {
  const search = Route.useSearch();
  const searchQuery = search.searchQuery;

  const productsQuery = useSuspenseQuery(productsQueryOptions());
  const products = productsQuery.data;

  const productFilter = products.filter((v, _, products) => {
    if (!searchQuery) return products;

    if (
      v.add_desk
        .toLocaleLowerCase()
        .includes(String(searchQuery).toLocaleLowerCase())
    )
      return v;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-current">
          {/* Customers also purchased */}
          {"สินค้าทั้งหมดของร้าน"}
        </h2>

        {products.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {productFilter.length > 0 ? (
              productFilter.map((product, i) => (
                <div key={i} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={
                        product.add_picture
                          ? product.add_picture
                          : "https://placehold.co/400x600.png"
                      }
                      alt={product.add_desk}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>

                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3
                        className="text-sm text-current truncate w-44 md:w-40"
                        title={product.add_desk}
                      >
                        <Link
                          to="/product/$productId"
                          params={{ productId: product.id }}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />

                          {product.add_desk}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.add_color}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-current">
                      {/* {product.add_price} */}
                      {currency(product.add_price).format({ symbol: "฿" })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>{"ไม่พบสินค้าที่ค้นหา"}</p>
            )}
          </div>
        ) : (
          <p>no product</p>
        )}
      </div>

      {/* <Link to="/scheduling_desk">add product</Link> */}
    </motion.div>
  );
}
