import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { CustomPagi } from "./CustomPagi";
import { usePagination } from "../../hooks/usePagination";
import { UnknownObj } from "../../shared/types/base";
import { GREEN } from "../../styled/color";

export interface StrictField<T> {
  header: string;
  fieldKey: keyof T;
  width?: number;
}

export interface CustomTableProps<TData extends UnknownObj> {
  fields: StrictField<TData>[];
  data: TData[];
  rows?: number;
}

const DEFAULT_CELL_WIDTH = '20%';

export function CustomTable<TData extends UnknownObj>({
  data,
  rows = data.length,
  fields,
}: CustomTableProps<TData>) {
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
    <Box sx={{ border: `1px solid ${GREEN["500"]}` }}>
      <TableContainer>
        <TableHead sx={{ backgroundColor: GREEN["500"] }}>
          {/* map field header */}
          <TableRow>
            {fields.map((field) => (
              <TableCell width={field.width || DEFAULT_CELL_WIDTH}>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 500,
                    fontSize: { xs: 15, sm: 17 },
                  }}
                >
                  {field.header}
                </Typography>
              </TableCell>
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
                    <React.Fragment>{row[fieldKey] ?? "none"}</React.Fragment>
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </TableContainer>
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
    </Box>
  );
}
