import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  styled
} from "@mui/material";
import { useState } from "react";
import { IcBaselineArrowDropDown } from "../../../../shared/icons/Icon";
import { BACKGROUND_COLOR, GREEN } from "../../../../styled/color";
import { LinkCustom } from "../../../../styled/styled";
import { Item, items } from "../../../Home/Home";
import { NotificationMenu } from "./NotificationMenu";
import { UserProfileMenu } from "./UserProfileMenu";

const DEFAULT_POS = -1;
export const HeaderDesktop = () => {
  const [pos, setPos] = useState(DEFAULT_POS);

  const onCloseSubMenu = () => {
    setPos(DEFAULT_POS);
  };
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
                <LinkCustom
                  key={index}
                  to={item.path}
                  onMouseEnter={() => {
                    setPos(index);
                  }}
                  onMouseLeave={() => {
                    setPos(DEFAULT_POS);
                  }}
                >
                  <Box
                    component={"div"}
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
                    <Stack direction="row">
                      <ItemText>{item.text}</ItemText>
                      {item?.children && (
                        <IcBaselineArrowDropDown fontSize={20} color="white" />
                      )}
                    </Stack>
                  </Box>
                  <Box position={"relative"}>
                    {item?.children && index === pos && (
                      <SubHeader
                        items={item.children}
                        onClose={onCloseSubMenu}
                      />
                    )}
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

type SubHeaderProps = {
  items: Item[];
  onClose: () => void;
};
const SubHeader = ({ items, onClose }: SubHeaderProps) => {
  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: GREEN["900"],
        px: 1,
        pt: 1,
        pb: 2,
        zIndex: 1,
      }}
    >
      {items.map((item) => (
        <LinkCustom to={item.path}>
          <Box
            component={"div"}
            sx={{
              width: "100%",
              cursor: "pointer",
              boxSizing: "border-box",
              "&:hover": { border: "1px solid white" },
              // border: `1px solid ${BACKGROUND_COLOR["HEADER"]}`,
              border: `1px solid ${GREEN["900"]}`,

              px: 0.5,
              py: 0.25,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "all 0.25s",
            }}
            onClick={onClose}
          >
            <ItemText>{item.text}</ItemText>
          </Box>
        </LinkCustom>
      ))}
    </Paper>
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
