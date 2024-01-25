import { FileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { productOrderQueryOptions } from "@/libs/queryOptions";

export const Route = new FileRoute('/manage/product/view_desk/$orderId').createRoute({
  parseParams: (params) => ({
    orderId: z.number().int().parse(Number(params.orderId)),
  }),
  stringifyParams: ({ orderId }) => ({ orderId: `${orderId}` }),
  // validateSearch: (search) =>
  //   z
  //     .object({
  //       showNotes: z.boolean().optional(),
  //       notes: z.string().optional(),
  //     })
  //     .parse(search),
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