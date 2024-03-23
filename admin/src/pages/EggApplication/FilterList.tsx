import { Box } from "@mui/material";
import { StatusTabs } from "./StatusTabs";

export const FilterList = () => {
  return (
    <Box
      py={1}
      my={1}
      //sx={{overflowX:'scroll'}}
    >
      <StatusTabs onChange={()=>{}}/>
    </Box>
  );
};
