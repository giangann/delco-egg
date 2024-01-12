import { Box, Container, Stack, Typography, styled } from "@mui/material";
import { BoxWithBigNumber } from "../../components/Box/BoxWithBIgNumber";
import { OPACITY_TO_HEX } from "../../shared/constants/common";
export const QuyTrinhTrungDesktop = () => {
  return (
    <Container>
      <Stack spacing={12}>
        {process.map((part, index) => (
          <ProcessBoxDesktop
            key={index}
            titleNumberIndex={index + 1}
            titleText={part.title}
            imgSrc={part.imgSrc}
          >
            {part.content}
          </ProcessBoxDesktop>
        ))}
      </Stack>
    </Container>
  );
};

const ProcessBoxDesktop = ({
  children,
  titleNumberIndex,
  titleText,
  imgSrc,
}: {
  children: React.ReactNode;
  titleNumberIndex: number;
  titleText: string;
  imgSrc: string;
  key: number;
}) => {
  let titleNumber = `0${titleNumberIndex}`;
  let isLeft = titleNumberIndex % 2;
  return (
    <BoxWithBigNumber
      displayNumber={titleNumber}
      pos={isLeft ? "left" : "right"}
    >
      <Box
        padding={3}
        sx={{
          display: "flex",
          flexDirection: isLeft ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        <Box sx={{ paddingTop: 4, paddingLeft: !isLeft ? 2 : 0 }}>
          <TitleText sx={{ textAlign: isLeft ? "left" : "right", mb: 2 }}>
            {titleText}
          </TitleText>
          {children}
        </Box>
        <Box>
          <img src={imgSrc} style={{ maxWidth: "100%" }} />
        </Box>
      </Box>
    </BoxWithBigNumber>
  );
};

const TitleText = styled(Typography)(({ theme }) => ({
  color: "green",
  fontSize: 24,
  fontWeight: 900,
  textAlign: "center",
  [theme.breakpoints.down("xl")]: {},
}));

const HeadingText = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  textAlign: "center",

  [theme.breakpoints.up("sm")]: {
    textAlign: "left",
  },
}));

const ContentText = styled(Typography)(({ theme }) => ({
  color: `#000000${OPACITY_TO_HEX["85"]}`,
  [theme.breakpoints.down("xl")]: {},
}));

const ContentTextSmallLineHeight = styled(Typography)(({ theme }) => ({
  color: `#000000${OPACITY_TO_HEX["75"]}`,
  lineHeight: "16px",

  [theme.breakpoints.up("sm")]: {
    lineHeight: 1.5,
  },
}));

// const intro = [
//   "DELCO đặc biệt quan tâm đến môi trường vi khí hậu trong nhà gà, kiểm soát nhiệt độ, độ ẩm, nồng độ CO2... trong chuồng. Môi trường chăn nuôi tối ưu giúp đàn gà khoẻ mạnh, hạn chế dịch bệnh và cho tỷ lệ đẻ trứng trung bình 85-90%",
//   "Nguồn thức ăn và nguồn nước dùng cho chăn nuôi cũng được kiểm soát kĩ càng, không chứa kim loại nặng, không chứa vi sinh vật có hại, không chứa Chloramphenicol, Salbutamol... gây ảnh hưởng đến sức khoẻ gà và chất lượng trứng.",
// ];

const part1 = {
  title: "HẠ TẦNG",
  imgSrc: "/egg-img.jpg",
  content: (
    <ContentText>
      Hiện nay DELCO đang sở hữu 03 nhà gà với tổng công suất 87.000 con. Các
      nhà gà đều được nghiên cứu kết cấu kiên cố, chắc chắn, đảm bảo môi trường
      chăn nuôi ổn định và cho hiệu qủa kinh tế cao.
    </ContentText>
  ),
};

const part2 = {
  title: "KIỂM SOÁT MÔI TRƯỜNG",
  imgSrc: "/egg-img.jpg",
  content: (
    <>
      <ContentText>
        Chúng tôi luôn đầu tư bài bản để kiểm soát môi trường chăn nuôi một cách
        tốt nhất:
      </ContentText>
      <ContentText>
        - Hệ thống chống nóng kết hợp cảm biến nhiệt độ giúp kiểm soát hiệu quả
        nhiệt độ bên trong khu vực sản xuất
      </ContentText>
      <ContentText>
        - Hệ thống thông gió hiện đại đảm bảo sức khỏe cho công nhân chăm sóc và
        vật nuôi
      </ContentText>
      <ContentText>
        - Hệ thống cảnh báo sự cố tự động (nhiệt độ, độ ẩm, nồng độ CO2...) giúp
        theo dõi và chăm sóc sức khỏe đàn gà.
      </ContentText>
    </>
  ),
};

const part3 = {
  title: "CHẾ ĐỘ DINH DƯỠNG",
  imgSrc: "/egg-img.jpg",
  content: (
    <>
      <HeadingText>Nguồn thức ăn</HeadingText>
      <ContentTextSmallLineHeight>
        DELCO Farm lựa chọn nhà cung cấp thức ăn chăn nuôi có uy tín, sử dụng
        các loại cám chất lượng cao, kiểm nghiệm mức độ dinh dưỡng an toàn, đảm
        bảo không chứa kim loại nặng, vi sinh, Chloramphenicol, Salbutamol...
      </ContentTextSmallLineHeight>
      <HeadingText>Nguồn nước chăn nuôi</HeadingText>
      <ContentTextSmallLineHeight>
        DELCO Farm sử dụng hệ thống lọc và xử lý UV loại bỏ vi khuẩn gây bệnh.
        Nguồn nước sau khi xử lý được kiểm tra, kiểm nghiệm chặt chẽ các chỉ số
        về tổng khuẩn coliform, salmonella spp, clostridia, E.coli... Đảm bảo
        chất lượng trước khi sử dụng trong chăn nuôi.
      </ContentTextSmallLineHeight>
    </>
  ),
};

const process = [part1, part2, part3];
