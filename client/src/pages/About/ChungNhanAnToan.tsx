import { Box, Container, Grid, Typography } from "@mui/material";
import { GREEN } from "../../styled/color";
import {
  ATagCustom,
  BoxAbsoluteFull,
  alignCenterSx,
} from "../../styled/styled";
import NUOC_CHAN_NUOI_IMG from "/images/certs/Phieu-ket-qua-phan-tich-Nuoc-chan-nuoit-1536x1050.jpg";
import KIEM_NGHIEM_TRUNG_GA_IMG from "/images/certs/ket-qua-kiem-nghiem-trung-ga.jpg";
import DIEU_KIEN_CHAN_NUOI_IMG from "/images/certs/du-dieu-kien-chan-nuo2i.jpg";
import BGIMG from "/images/certs/bg.jpg";
import { OPACITY_TO_HEX } from "../../shared/constants/common";
import { useDevice } from "../../hooks/useDevice";

export const ChungNhanAnToan = () => {
  const { isMobile } = useDevice();
  return (
    <Box>
      <Box
        mb={6}
        position="relative"
        sx={{
          background: isMobile ? `url('${BGIMG}')` : "",
          minHeight: isMobile ? 200 : "unset",
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
            CHỨNG NHẬN AN TOÀN
          </Typography>
        </BoxAbsoluteFull>
        {!isMobile && (
          <img style={{ maxWidth: "100%", marginBottom: -4 }} src={BGIMG} />
        )}
      </Box>
      <Container>
        <Grid container spacing={3}>
          {certificates.map((cert) => (
            <Grid item xs={12} sm={4}>
              <ItemBox {...cert} />
            </Grid>
          ))}
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
  return (
    <Box sx={{ border: `1px solid ${GREEN["500"]}` }}>
      <ATagCustom href={link} target="_blank">
        <Box position={"relative"}>
          <img style={{ width: "100%", maxWidth: "100%" }} src={image} />
          <Box sx={{ p: 2, backgroundColor: GREEN["500"], ...alignCenterSx }}>
            <Typography fontSize={14} color="white">
              {caption}
            </Typography>
          </Box>
        </Box>
      </ATagCustom>
    </Box>
  );
};

const certificates: ItemBoxProps[] = [
  {
    image: NUOC_CHAN_NUOI_IMG,
    link: "/pdf/3.Ket-qua-kiem-nghiem-nuoc-chan-nuoi.pdf",
    caption: "Kết quả kiểm nghiệm nước chăn nuôi",
  },
  {
    image: KIEM_NGHIEM_TRUNG_GA_IMG,
    link: "/pdf/4.-Ket-qua-kiem-nghiem-trung-ga.pdf",
    caption: "Kết quả kiểm nghiệm trứng gà",
  },
  {
    image: DIEU_KIEN_CHAN_NUOI_IMG,
    link: "/pdf/6.-Chung-nhan-co-so-du-dieu-kien-chan-nuoi.pdf",
    caption: "Chứng nhận cơ sở đủ điều kiện chăn nuôi",
  },
];
