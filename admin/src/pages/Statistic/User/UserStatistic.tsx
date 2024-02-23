import { Box, Typography } from "@mui/material";
import { BoxStatistic } from "../../../components/Box/BoxStatistic";
import {
    IcOutlineNavigateNext
} from "../../../shared/icons/Icon";
import {
    RowStatisticStyled,
    StackAlignCenterJustifySpaceBetween
} from "../../../styled/styled";

export const UserStatistic = () => {
  return (
    <Box>
      <BoxStatistic title="Tổng quan">
        <Box paddingLeft={0.25} marginTop={1.25}>
          <RowStatisticStyled>
            <StackAlignCenterJustifySpaceBetween>
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                Số lượng user hiện tại{": "}
                <span style={{ fontWeight: 650 }}>10</span>
              </Typography>
              <IcOutlineNavigateNext />
            </StackAlignCenterJustifySpaceBetween>
          </RowStatisticStyled>

          <RowStatisticStyled>
            <StackAlignCenterJustifySpaceBetween>
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                User mới tạo trong tuần{": "}
                <span style={{ fontWeight: 650 }}>3 </span>
              </Typography>
              <IcOutlineNavigateNext />
            </StackAlignCenterJustifySpaceBetween>{" "}
          </RowStatisticStyled>
        </Box>
      </BoxStatistic>

      <BoxStatistic title="Insight">
        <Box paddingLeft={0.25} marginTop={1.25}>
          <RowStatisticStyled>
            <StackAlignCenterJustifySpaceBetween>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                  Mua nhiều nhất{": "}
                  <span style={{ fontWeight: 650 }}>123,000,000 đ</span>
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                  {"User: "}
                  <span style={{ fontWeight: 650 }}>Nguyễn Văn A</span>
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                  {"Công ty: "}
                  <span style={{ fontWeight: 650 }}>Trứng Hà Nam</span>
                </Typography>
              </Box>
              <IcOutlineNavigateNext />
            </StackAlignCenterJustifySpaceBetween>
          </RowStatisticStyled>

          <RowStatisticStyled>
            <StackAlignCenterJustifySpaceBetween>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                  Đặt nhiều đơn nhất{": "}
                  <span style={{ fontWeight: 650 }}>26 đơn</span>
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                  {"User: "}
                  <span style={{ fontWeight: 650 }}>Nguyễn Thị B</span>
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                  {"Công ty: "}
                  <span style={{ fontWeight: 650 }}>Cám CP</span>
                </Typography>
              </Box>
              <IcOutlineNavigateNext />
            </StackAlignCenterJustifySpaceBetween>{" "}
          </RowStatisticStyled>

          <RowStatisticStyled>
            <StackAlignCenterJustifySpaceBetween>
              <Box>
                <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                  Hủy đơn nhiều nhất:{" "}
                  <span style={{ fontWeight: 650 }}>3 đơn</span>
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                  {"User: "}
                  <span style={{ fontWeight: 650 }}>Nguyễn Thị B</span>
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                  {"Công ty: "}
                  <span style={{ fontWeight: 650 }}>Cám CP</span>
                </Typography>
              </Box>
              <IcOutlineNavigateNext />
            </StackAlignCenterJustifySpaceBetween>{" "}
          </RowStatisticStyled>
        </Box>
      </BoxStatistic>
    </Box>
  );
};
