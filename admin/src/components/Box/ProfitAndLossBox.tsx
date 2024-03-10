import { Box, Tooltip, Typography } from "@mui/material";
import { IcBaselineArrowDropUp } from "../../shared/icons/Icon";
import { alignCenterSx } from "../../styled/styled";
import { useState } from "react";

// check 3 range of value: less than, greater than or equal 0
type ProfitAndLossBoxProps = {
  value: number;
  suffix: string;
  toolTipText?: string;
};
export const ProfitAndLossBox = ({
  value,
  suffix,
  toolTipText,
}: ProfitAndLossBoxProps) => {
  const [open, setOpen] = useState(false);
  let color;
  let arrowRotate = 0;
  if (value === 0) {
    color = "orange";
    arrowRotate = 90;
  } else if (value > 0) {
    color = "green";
  } else {
    color = "red";
    arrowRotate = 180;
  }
  return (
    <Tooltip
      title={toolTipText}
      arrow
      open={open}
      onClose={() => setOpen(false)}
      enterTouchDelay={5000}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -20],
              },
            },{
                name:'fontSize',
                options:{
                    fontSize:18,
                }
            }
          ],
        },
      }}
    >
      <Box
        component="div"
        onClick={() => setOpen(!open)}
        sx={{ ...alignCenterSx }}
      >
        <Typography
          style={{ fontSize: 18, marginLeft: 8, fontWeight: 500, color: color }}
        >
          {`${value} ${suffix}`}
        </Typography>
        <IcBaselineArrowDropUp
          color={color}
          style={{
            fontSize: 25,
            transform: `rotate(${arrowRotate}deg)`,
          }}
        />
      </Box>
    </Tooltip>
  );
};
