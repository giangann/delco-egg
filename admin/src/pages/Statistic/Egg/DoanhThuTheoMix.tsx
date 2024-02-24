import { Box, Typography } from "@mui/material";
import { BoxStatistic } from "../../../components/Box/BoxStatistic";
import { StackAlignCenterJustifySpaceBetween } from "../../../styled/styled";
import { OPACITY_TO_HEX } from "../../../shared/constants/common";

const items = [
  {
    name: "Mix 1",
  },
];

export const DoanhThuTheoMix = () => {
  return (
    <BoxStatistic title="Trứng xuất theo mix">
      <Item name={"Mix 1"} value={"156,000,000 đ"} />
      <Item name={"Mix 1"} value={"156,000,000 đ"} />
      <Item name={"Mix 1"} value={"156,000,000 đ"} />
    </BoxStatistic>
  );
};
const Item = ({ name, value }: { name: string; value: string }) => {
  return (
    <Box>
      <Row name={name} value={value} />
      <LineHorizontal percent={0.3} />
    </Box>
  );
};
const Row = ({ name, value }: { name: string; value: string }) => {
  return (
    <StackAlignCenterJustifySpaceBetween>
      <Typography>{name}</Typography>
      <Typography>{value}</Typography>
    </StackAlignCenterJustifySpaceBetween>
  );
};

const LineHorizontal = ({ percent }: { percent: number }) => {
  const width = 300;
  const inner = percent * width;
  return (
    <Box
      width={`${width}px`}
      height={"8px"}
      sx={{
        backgroundColor: `#000000${OPACITY_TO_HEX["10"]}`,
        borderRadius: "8px",
      }}
    >
      <Box height={"8px"} width={inner} sx={{ backgroundColor: "red" }} />
    </Box>
  );
};
