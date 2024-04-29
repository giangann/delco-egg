import { Button } from "@mui/material";
import { CSVLink } from "react-csv";

type Props = {
  fileName: string;
  data: any;
};
export const ReactExportCsv: React.FC<Props> = ({ fileName, data }) => {
  return (
    <div>
      <Button variant="contained">
        <CSVLink data={data} filename={fileName}>
          Export
        </CSVLink>
      </Button>
    </div>
  );
};
