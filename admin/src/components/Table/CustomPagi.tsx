import {
  Button,
  Stack,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
} from "@mui/material";
import React, { ChangeEventHandler } from "react";

interface CustomPagiProps {
  totalPage: number;
  perpage: number;
  currPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onPerPageChange: (perPage: number) => void;
  onGoToEnd: () => void;
  onGoToStart: () => void;
}

export const CustomPagi = ({
  totalPage,
  perpage,
  currPage,
  onNextPage,
  onPrevPage,
  onPerPageChange,
  onGoToEnd,
  onGoToStart,
}: CustomPagiProps) => {
  const defaultOptions = [3, 6, 9, 12];

  const handleChange = (
    event: ChangeEventHandler<HTMLSelectElement>,
    value: number
  ) => {
    onPerPageChange(value);
  };
  return (
    <TableFooter>
      <TableRow>
        {/* <TablePagination> */}
        <TableCell>
          <React.Fragment>
            <Stack direction={"row"} alignItems={"center"}>
              <Button disabled={currPage === 1} onClick={onGoToStart}>
                {"|<"}
              </Button>
              <Button disabled={currPage === 1} onClick={onPrevPage}>
                {"<"}
              </Button>
              <Typography>Curr: {`${currPage}/${totalPage}`}</Typography>
              <Button disabled={currPage === totalPage} onClick={onNextPage}>
                {">"}
              </Button>
              <select defaultValue={perpage} onChange={handleChange}>
                {defaultOptions.map((option) => (
                  <option>{option}</option>
                ))}
              </select>
              <Button disabled={currPage === totalPage} onClick={onGoToEnd}>
                {"|>"}
              </Button>
            </Stack>
          </React.Fragment>
        </TableCell>
        {/* </TablePagination> */}
      </TableRow>
    </TableFooter>
  );
};
