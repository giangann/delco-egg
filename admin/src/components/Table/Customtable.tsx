import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { IcRoundKeyboardBackspace } from "../../shared/icons/Icon";
import { UnknownObj } from "../../shared/types/base";
import { GREEN } from "../../styled/color";
import { ButtonResponsive } from "../../styled/styled";
import { CustomPagi, CustomPagiProps } from "./CustomPagi";

export interface StrictField<T> {
  header: string;
  fieldKey: keyof T;
  width?: number;
  render?: (row: T) => React.ReactNode | string;
}

export interface CustomTableProps<TData extends UnknownObj> {
  fields: StrictField<TData>[];
  data: TData[];
  pagiProps: CustomPagiProps;
  rows?: number;
  onActionViewDetail?: (row: TData) => void;
}

const DEFAULT_CELL_WIDTH = "20%";

export function CustomTable<TData extends UnknownObj>({
  data,
  pagiProps,
  fields,
  onActionViewDetail,
}: CustomTableProps<TData>) {
  const {
    totalItems,
    totalPage,
    perpage,
    currPage,
    onNextPage,
    onPrevPage,
    onPerPageChange,
    onGoToEnd,
    onGoToStart,
  } = pagiProps;

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
                <StyledText>{field.header}</StyledText>
              </TableCell>
            ))}
            {onActionViewDetail && (
              <TableCell sx={{ padding: { xs: "8px", sm: "16px" } }}>
                <StyledText>{"Thao tác"}</StyledText>
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        {!data.length ? (
          <NoTableData />
        ) : (
          <TableBody>
            {data.map((row: TData) => (
              <TableRow>
                {fields.map(({ fieldKey, render }: StrictField<TData>) => {
                  return (
                    <TableCell sx={{ padding: { xs: "12px", sm: "16px" } }}>
                      {render ? (
                        render(row)
                      ) : (
                        <React.Fragment>
                          <DefaultBodyText>
                            {row[fieldKey] ?? "none"}
                          </DefaultBodyText>
                        </React.Fragment>
                      )}
                    </TableCell>
                  );
                })}
                {onActionViewDetail && (
                  <TableCell sx={{ padding: { xs: "8px", sm: "16px" } }}>
                    <ButtonResponsive
                      // @ts-ignore
                      onClick={() => onActionViewDetail(row)}
                      startIcon={
                        <IcRoundKeyboardBackspace
                          style={{ transform: "rotate(180deg)" }}
                        />
                      }
                    >
                      chi tiết
                    </ButtonResponsive>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        )}
      </TableContainer>
      <CustomPagi
        totalItems={totalItems}
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

const StyledText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: "white",
  fontWeight: 500,
  fontSize: 15,
  [theme.breakpoints.up("sm")]: {
    fontSize: 17,
  },
}));

export const DefaultBodyText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: 15,
  [theme.breakpoints.up("sm")]: {
    fontSize: 17,
  },
}));

export const NoTableData = () => {
  return (
    <Box sx={{ my: 8 }}>
      <Typography textAlign={"center"} sx={{ fontSize: 32, fontWeight: 600 }}>
        {"Không có dữ liệu"}
      </Typography>
    </Box>
  );
};
