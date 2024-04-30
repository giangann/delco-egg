import { Button, ButtonProps } from "@mui/material";
import { CSVLink } from "react-csv";

type Props = {
  fileName: string;
  data: any;
  buttonProps?: ButtonProps;
};
export const ReactExportCsv: React.FC<Props> = ({ fileName, data , buttonProps}) => {
  return (
    <div>
      <Button variant="contained" {...buttonProps}>
        <CSVLink data={data} filename={fileName}>
          Tải file
        </CSVLink>
      </Button>
    </div>
  );
};
