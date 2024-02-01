import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { productOrderQueryOptions } from "@/libs/queryOptions";

export const Route = createFileRoute('/manage/product/view_desk/$orderId')({
  parseParams: (params) => ({
    orderId: z.number().int().parse(Number(params.orderId)),
  }),
  stringifyParams: ({ orderId }) => ({ orderId: `${orderId}` }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      productOrderQueryOptions(opts.params.orderId)
    ),
  component: ManageProductViewDeskDetailComponent,
});

function ManageProductViewDeskDetailComponent() {
    return (
        <p>asd</p>
    )
}