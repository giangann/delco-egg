import Pagination, { PaginationProps } from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import * as React from "react";

type Props = {
  currentPage?: number;
  totalPages?: number;
} & PaginationProps;
export const BasePagi: React.FC<Props> = ({
  currentPage,
  totalPages,
  ...pagiProps
}) => {
  return (
    <Stack spacing={2}>
      <Pagination count={totalPages || 1} page={currentPage} {...pagiProps} />
    </Stack>
  );
};
