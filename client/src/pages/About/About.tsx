import { Box, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDevice } from "../../hooks/useDevice";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import ABOUT_BGIMG from "/images/quy-trinh/about-us-bg.webp";
import CHUNG_NHAN_BGIMG from "/images/quy-trinh/cnat.webp";
import QUY_TRINH_BGIMG from "/images/quy-trinh/quy-trinh-trung.webp";

import { OPACITY_TO_HEX } from "../../shared/constants/common";
import { GREEN } from "../../styled/color";
import { BoxAbsoluteFull, alignCenterSx } from "../../styled/styled";

export const About = () => {
  const { isMobile } = useDevice();
  return (
    <Box>
      <Box
        mb={6}
        position="relative"
        sx={{
          background: `url('${ABOUT_BGIMG}')`,
          minHeight: isMobile ? 200 : "30vh",
          backgroundSize: "cover",
        }}
      >
        <BoxAbsoluteFull
          sx={{
            backgroundColor: `#000000${OPACITY_TO_HEX["30"]}`,
            ...alignCenterSx,
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              color: "white",
              fontSize: isMobile ? 24 : 28,
            }}
            variant="h4"
          >
            VỀ CHÚNG TÔI
          </Typography>
        </BoxAbsoluteFull>
      </Box>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <ItemBox
              image={QUY_TRINH_BGIMG}
              link={SCREEN_PATHS.QUY_TRINH}
              caption="Quy trình trứng"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ItemBox
              image={CHUNG_NHAN_BGIMG}
              link={SCREEN_PATHS.CHUNG_NHAN}
              caption="Chứng nhận an toàn"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

type ItemBoxProps = {
  image: string;
  link: string;
  caption: string;
};
const ItemBox = ({ image, link, caption }: ItemBoxProps) => {
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  return (
    <Box
      component={"div"}
      onClick={() => navigate(link)}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Box>
        <Box
          position="relative"
          sx={{
            minHeight: isMobile ? 250 : 400,
            minWidth: isMobile ? 200 : 400,
            background: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Box sx={{ p: { xs: 1, sm: 2 }, ...alignCenterSx }}>
          <Typography
            variant="h4"
            textAlign={"center"}
            fontSize={isMobile ? 22 : 26}
            fontWeight={900}
            color={GREEN["500"]}
          >
            {caption}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
