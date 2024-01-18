import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { CustomPagi } from "./CustomPagi";
import { usePagination } from "../../hooks/usePagination";

export interface StrictField<T> {
  header: string;
  fieldKey: keyof T;
}

type UnknownObj = { [key: string]: any };
interface CustomTableProps<TData extends UnknownObj> {
  fields: StrictField<TData>[];
  data: TData[];
  rows?: number;
}

export function CustomTable<TData extends UnknownObj>({
  data,
  rows = data.length,
  fields,
}: CustomTableProps<TData>) {
  console.log("data", data);
  console.log("rows", rows);

  const {
    totalPage,
    perpage,
    currPage,
    onNextPage,
    onPrevPage,
    onPerPageChange,
    onGoToEnd,
    onGoToStart,
  } = usePagination({ rows: rows });

  return (
    <TableContainer>
      <TableHead>
        {/* map field header */}
        <TableRow>
          {fields.map((field) => (
            <TableCell>{field.header}</TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {data
          .slice((currPage - 1) * perpage, currPage * perpage)
          .map((row: TData) => (
            <TableRow>
              {fields.map(({ fieldKey }: StrictField<TData>) => (
                <TableCell>
                  <React.Fragment>{row[fieldKey]}</React.Fragment>
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>

      <CustomPagi
        totalPage={totalPage}
        perpage={perpage}
        currPage={currPage}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        onPerPageChange={onPerPageChange}
        onGoToEnd={onGoToEnd}
        onGoToStart={onGoToStart}
      />
    </TableContainer>
  );
}
