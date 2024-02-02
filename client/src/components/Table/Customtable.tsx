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
import { usePagination } from "../../hooks/usePagination";
import { UnknownObj } from "../../shared/types/base";
import { GREEN } from "../../styled/color";
import { CustomPagi } from "./CustomPagi";

export interface StrictField<T> {
  header: string;
  fieldKey: keyof T;
  width?: number;
  render?: (row: T) => React.ReactNode | string;
}

export interface CustomTableProps<TData extends UnknownObj> {
  fields: StrictField<TData>[];
  data: TData[];
  rows?: number;
}

const DEFAULT_CELL_WIDTH = "20%";

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
        <TableHead
          sx={{
            backgroundColor: GREEN["500"],
          }}
        >
          {/* map field header */}
          <TableRow>
            {fields.map((field) => (
              <TableCell
                sx={{ padding: { xs: "8px", sm: "16px" } }}
                width={field.width || DEFAULT_CELL_WIDTH}
              >
                <Typography
                  sx={{
                    textAlign: "center",
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
                {fields.map(({ fieldKey, render }: StrictField<TData>) => {
                  return (
                    <TableCell sx={{ padding: { xs: "12px", sm: "16px" } }}>
                      {render ? (
                        render(row)
                      ) : (
                        <React.Fragment>
                          <Typography
                            sx={{
                              textAlign: "center",
                              fontSize: { xs: 15, sm: 17 },
                            }}
                          >
                            {row[fieldKey] ?? "none"}
                          </Typography>
                        </React.Fragment>
                      )}
                    </TableCell>
                  );
                })}
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