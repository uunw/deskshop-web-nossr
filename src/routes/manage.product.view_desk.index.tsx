import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import currency from "currency.js";
import logLevel from "loglevel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TbColumns2, TbFilter, TbPrinter, TbRefresh } from "react-icons/tb";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  productOrdersQueryOptions,
  useAcceptOrderMutation,
  useCancelOrderMutation,
} from "@/libs/queryOptions";
import { cn } from "@/libs/utils";
import { BookDeskType } from "@/types/product.type";

export const Route = createFileRoute('/manage/product/view_desk/')({
  component: ManageProductViewDeskComponent,
});

function ManageProductViewDeskComponent() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isRefetching, setIsRefetching] = useState(false);

  const productOrders = useSuspenseQuery(productOrdersQueryOptions());
  const { data: books } = productOrders;

  const acceptOrderMutation = useAcceptOrderMutation();
  const cancelOrderMutation = useCancelOrderMutation();

  const handleAcceptOrder = useCallback(
    async (orderId: number) => {
      if (!confirm("คุณต้องการอนุมัติการสั่งซื้อหรือไม่?")) return;
      logLevel.debug("accept order", orderId);

      await acceptOrderMutation.mutateAsync(orderId);
      await productOrders.refetch();

      toast("อนุมาติการสั่งซื้อเสร็จสิ้น");
    },
    [acceptOrderMutation, productOrders]
  );

  const handleCancelOrder = useCallback(
    async (orderId: number) => {
      if (!confirm("คุณต้องการยกเลิกการสั่งซื้อหรือไม่?")) return;
      logLevel.debug("cancel order", orderId);

      await cancelOrderMutation.mutateAsync(orderId);
      await productOrders.refetch();

      toast("ยกเลิกการสั่งซื้อเสร็จสิ้น");
    },
    [cancelOrderMutation, productOrders]
  );

  const columns = useMemo<ColumnDef<BookDeskType>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "book_id",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {"Order ID"}
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "add_desk",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {"Product"}
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <Button variant="link" className="p-0" asChild>
            <Link
              to="/product/$productId"
              params={{ productId: row.original.desk_id }}
            >
              {row.getValue("add_desk")}
            </Link>
          </Button>
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {"Customer"}
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        // cell: ({ row }) => (
        //   <div className="lowercase">{row.original.name}</div>
        // ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {"Email"}
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        // cell: ({ row }) => (
        //   <div className="lowercase">{row.original.name}</div>
        // ),
      },
      {
        accessorKey: "book_status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {"Status"}
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          // <div className="capitalize">{row.getValue("book_status")}</div>
          <Badge variant="outline">{row.getValue("book_status")}</Badge>
        ),
      },

      {
        accessorKey: "unit_price",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("unit_price"));

          // Format the amount as a dollar amount
          // const formatted = new Intl.NumberFormat("en-US", {
          //   style: "currency",
          //   currency: "USD",
          // }).format(amount);

          return (
            <div className="text-right font-medium">
              {currency(amount).format({ symbol: "฿" })}
            </div>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          // const payment = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                {row.original.book_status == "PENDING" ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleAcceptOrder(row.original.book_id)}
                    >
                      {"อนุมัติการสั่งซื้อสินค้า"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleCancelOrder(row.original.book_id)}
                    >
                      {"ยกเลิกการสั่งซื้อสินค้า"}
                    </DropdownMenuItem>
                  </>
                ) : null}

                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(String(row.original.book_id));
                    toast(
                      `คัดลอกไอดีการจองเสร็จสิ้น (${row.original.book_id})`
                    );
                  }}
                >
                  {"คัดลอก Order ID"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
                <DropdownMenuItem asChild>
                  <Link
                    to="/manage/product/view_desk/$orderId"
                    params={{ orderId: row.original.book_id }}
                  >
                    {"View payment details"}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleAcceptOrder, handleCancelOrder]
  );

  const table = useReactTable({
    data: books ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleRefetchOrder = useCallback(async () => {
    setIsRefetching(true);

    await productOrders.refetch();

    setIsRefetching(false);
  }, [productOrders]);

  const handlePrintOrder = useCallback(() => {
    window.print();
  }, []);

  useEffect(() => {
    table.setGlobalFilter(globalFilter);
  }, [globalFilter, table]);

  return (
    <div className="w-full">
      <h1>{"ข้อมูลการจองสินค้า"}</h1>

      <div className="flex items-center py-4 justify-between">
        <div className="flex space-x-2">
          <Input
            placeholder="Filter value..."
            // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            value={globalFilter}
            onChange={(evt) => {
              const value = evt.currentTarget.value;
              setGlobalFilter(value);
              // table.getColumn("email")?.setFilterValue(event.target.value);
              // table.setGlobalFilter('')
              // const columeStatus = table.getColumn("status");
              // if(!columeStatus) return;
              // columeStatus.setFilterValue('PENDING')
            }}
            className="w-full"
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto"
                // onClick={handlePrintOrder}
              >
                <TbFilter className={cn("h-4 w-auto")} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" side="bottom">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{"กรองข้อมูล"}</h4>
                  {/* <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p> */}
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">{"ชื่อสินค้า"}</Label>
                    <Input
                      id="width"
                      className="col-span-2 h-8"
                      value={
                        (table
                          .getColumn("add_desk")
                          ?.getFilterValue() as string) ?? ""
                      }
                      onChange={(evt) => {
                        table
                          .getColumn("add_desk")
                          ?.setFilterValue(evt.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">{"ชื่อลูกค้า"}</Label>
                    <Input
                      id="maxWidth"
                      className="col-span-2 h-8"
                      value={
                        (table.getColumn("name")?.getFilterValue() as string) ??
                        ""
                      }
                      onChange={(evt) => {
                        table
                          .getColumn("name")
                          ?.setFilterValue(evt.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">{"สถานะ"}</Label>
                    <Select
                      onValueChange={(v) =>
                        table.getColumn("book_status")?.setFilterValue(v)
                      }
                      value={
                        (table
                          .getColumn("book_status")
                          ?.getFilterValue() as string) ?? ""
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">{"รออนุมัติ"}</SelectItem>
                        <SelectItem value="SUCCESS">{"อนุมัติ"}</SelectItem>
                        <SelectItem value="CANCEL">{"ยกเลิก"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    table.resetColumnFilters();
                  }}
                >
                  {"ล้างข้อมูล"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto"
                onClick={handlePrintOrder}
              >
                <TbPrinter className={cn("h-4 w-auto")} />
              </Button>
            </TooltipTrigger>

            <TooltipContent>{"ปริ้นการจองสินค้า"}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto"
                onClick={handleRefetchOrder}
                disabled={isRefetching}
              >
                <TbRefresh
                  className={cn(
                    "h-4 w-auto",
                    isRefetching ? "animate-spin" : null
                  )}
                />
              </Button>
            </TooltipTrigger>

            <TooltipContent>{"โหลดข้อมูลการจอง"}</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <TbColumns2 className="h-4 w-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Desk table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
