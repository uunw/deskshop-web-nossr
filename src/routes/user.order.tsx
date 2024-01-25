import { useSuspenseQuery } from "@tanstack/react-query";
import { FileRoute, Link } from "@tanstack/react-router";
import currency from "currency.js";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userSessionAtom } from "@/libs/jotai";
import { userOrderesQueryOptions } from "@/libs/queryOptions";

function UserOrderComponent() {
  const { t } = useTranslation();
  const [userSession] = useAtom(userSessionAtom);

  const userOrderesQuery = useSuspenseQuery(
    userOrderesQueryOptions(userSession?.id)
  );
  const userOrderes = userOrderesQuery.data;

  return (
    <>
      <h1 className="text-3xl">
        {t("userOrderHistoryTitle", "Order history")}
      </h1>

      {/* {JSON.stringify(userOrderes)} */}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{"Order ID"}</TableHead>
            <TableHead>{"สินค้า"}</TableHead>
            <TableHead>{t("userOrderStatus", "Status")}</TableHead>
            <TableHead>{"วันที่สั่ง"}</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userOrderes.map((order, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{order.book_id}</TableCell>
              <TableCell>
                <Button variant="link" className="p-0" asChild>
                  <Link
                    to="/product/$productId"
                    params={{ productId: order.id }}
                  >
                    {order.add_desk}
                  </Link>
                </Button>
              </TableCell>
              <TableCell>{order.book_status}</TableCell>
              <TableCell>
                {dayjs(order.book_date).format("DD/MM/BBBB HH:MM")}
              </TableCell>
              <TableCell className="text-right">
                {currency(order.unit_price).format({
                  symbol: "฿",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export const Route = new FileRoute("/user/order").createRoute().update({
  component: UserOrderComponent,
});
