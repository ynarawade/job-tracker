"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import { ApplicationRowSkeleton } from "@/features/job-application/components/ApplicationRowSkeleton";

import { columns } from "@/features/job-application/components/job-applications/Columns";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { useState } from "react";

interface ApplicationsTableProps {
  applications: JobApplicationListItem[];

  pagination?: {
    page: number;
    pageSize: number;
    totalRows: number;
    totalPages: number;
  };

  page: number;
  onPageChange: (page: number) => void;

  isLoading: boolean;
  isFetching: boolean;
}

export default function ApplicationsTable({
  applications,
  pagination,
  page,
  onPageChange,
  isLoading,
  isFetching,
}: ApplicationsTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnMenuOpen, setColumnMenuOpen] = useState(false);

  const table = useReactTable({
    data: applications,
    columns,

    getCoreRowModel: getCoreRowModel(),

    manualPagination: true,
    getRowId: (row) => row.id,

    pageCount: pagination?.totalPages ?? -1,

    state: {
      columnVisibility,

      pagination: {
        pageIndex: page - 1,
        pageSize: pagination?.pageSize ?? 10,
      },
    },

    onColumnVisibilityChange: setColumnVisibility,

    onPaginationChange: (updater) => {
      const currentPagination = {
        pageIndex: page - 1,
        pageSize: pagination?.pageSize ?? 10,
      };

      const nextPagination =
        typeof updater === "function" ? updater(currentPagination) : updater;

      onPageChange(nextPagination.pageIndex + 1);
    },
  });

  const visibleColumnCount = table.getVisibleLeafColumns().length;

  return (
    <div className="space-y-3 pt-1">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, company, or tech..."
            className="pl-8 h-9 text-xs"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 h-9 text-xs text-muted-foreground hover:text-foreground"
        >
          <SlidersHorizontalIcon className="h-3.5 w-3.5" />
          Filters
        </Button>
        <DropdownMenu>
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
                    onSelect={(event) => event.preventDefault()}
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

        <DropdownMenu open={columnMenuOpen} onOpenChange={setColumnMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-9 text-xs text-muted-foreground hover:text-foreground"
            >
              Columns
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>

            <DropdownMenuSeparator />

            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onSelect={(event) => {
                    event.preventDefault();
                  }}
                  onCheckedChange={(checked) => {
                    column.toggleVisibility(checked);
                  }}
                >
                  {typeof column.columnDef.header === "string"
                    ? column.columnDef.header
                    : column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-xs overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted/30 hover:bg-muted/30 border-b"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-3 px-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={visibleColumnCount}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-sm font-medium">No applications yet</p>
                    <p className="text-xs text-muted-foreground">
                      Add your first application to start tracking your job
                      search.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                if (row.original.extraction_state === "PENDING") {
                  return (
                    <ApplicationRowSkeleton
                      key={row.id}
                      application={row.original}
                      columnIds={row
                        .getVisibleCells()
                        .map((cell) => cell.column.id)}
                    />
                  );
                }
                return (
                  <TableRow
                    key={row.id}
                    className="hover:bg-muted/20 transition-colors duration-150"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 px-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-xs text-muted-foreground">
            {pagination && pagination.totalRows > 0
              ? `Showing ${
                  (pagination.page - 1) * pagination.pageSize + 1
                }–${Math.min(
                  pagination.page * pagination.pageSize,
                  pagination.totalRows
                )} of ${pagination.totalRows}`
              : "No applications"}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground">
              Page {page} of {pagination?.totalPages ?? 1}
            </span>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage() || isFetching}
                className="h-8 px-3 text-xs"
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage() || isFetching}
                className="h-8 px-3 text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
