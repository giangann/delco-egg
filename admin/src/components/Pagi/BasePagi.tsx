import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination, { PaginationProps } from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
      <Typography>Page: {currentPage}</Typography>
      <Pagination count={totalPages || 1} page={currentPage} {...pagiProps} />
    </Stack>
  );
};
