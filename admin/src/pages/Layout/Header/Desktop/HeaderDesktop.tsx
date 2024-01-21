import {
  Box,
  Container,
  Stack,
  Typography,
  styled
} from "@mui/material";
import { BACKGROUND_COLOR } from "../../../../styled/color";
import { LinkCustom } from "../../../../styled/styled";
import { items } from "../../../Home/Home";
import { NotificationMenu } from "./NotificationMenu";
import { UserProfileMenu } from "./UserProfileMenu";

export const HeaderDesktop = () => {
  return (
    <Box
      sx={{
        backgroundColor: BACKGROUND_COLOR["HEADER"],
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 70,
          }}
        >
          <BoxItem flexBasis={{ sm: "20%", md: "30%", lg: "40%" }}>
            <LinkCustom to="/">
              <Typography
                variant="h1"
                style={{ color: "white", fontWeight: 900, fontSize: 24 }}
              >
                Delco Egg
              </Typography>
            </LinkCustom>
          </BoxItem>

          <BoxItem flexBasis={"50%"}>
            <Stack direction={"row"} spacing={{ sm: 1, md: 2, lg: 3 }}>
              {items.map((item, index) => (
                <LinkCustom key={index} to={item.path}>
                  <Box
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      boxSizing: "border-box",
                      "&:hover": { border: "1px solid white" },
                      border: `1px solid ${BACKGROUND_COLOR["HEADER"]}`,
                      px: 0.5,
                      py: 0.25,
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      transition: "all 0.5s",
                    }}
                  >
                    <ItemText>{item.text}</ItemText>
                  </Box>
                </LinkCustom>
              ))}
            </Stack>
          </BoxItem>

          <BoxItem>
            <NotificationMenu />
            <UserProfileMenu />
          </BoxItem>
        </Box>
      </Container>
    </Box>
  );
};

const BoxItem = styled(Box)({
  // flexBasis: "33%",
});

const ItemText = styled(Typography)(({ theme }) => ({
  color: "whitesmoke",
  fontSize: 16,
  [theme.breakpoints.down("xl")]: {
    fontSize: 15,
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: 14,
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
}));
