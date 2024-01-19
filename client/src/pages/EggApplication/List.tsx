import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Box,
  Container,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  useTheme
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { CustomTablePagination } from "../../components/Table/CustomTablePagination";
import { useDevice } from "../../hooks/useDevice";
import { listForms } from "../../shared/constants/mockData";
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

export const List = () => {
  const { isMobile } = useDevice();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <Container>
      <Paper elevation={isMobile ? 0 : 1} sx={{ padding: { xs: 0, sm: 2 } }}>
        <TitleText mt={4}>Quản lý đơn đặt trứng</TitleText>

        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn </TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Giờ tạo</TableCell>
              <TableCell> Trạng thái </TableCell>
              <TableCell> Tổng tiền </TableCell>
            </TableRow>
          </TableHead>

          {listForms
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.formId}</TableCell>
                <TableCell>{row.dateCreated}</TableCell>
                <TableCell>{row.timeCreated}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
            ))}

          <CustomTablePagination lengthOfRows={listForms.length}/>
        </TableContainer>

        <Box mt={2}></Box>
      </Paper>
    </Container>
  );
};

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const TitleText = styled(Typography)(({ theme }) => ({
  color: "green",
  fontSize: 24,
  fontWeight: 900,
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {},
}));
