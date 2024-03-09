import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { IcBaselineArrowDropDown } from "../../../../shared/icons/Icon";
import { BACKGROUND_COLOR, GREEN } from "../../../../styled/color";
import { LinkCustom } from "../../../../styled/styled";
import { Item, items } from "../../../Home/Home";
import { NotificationMenu } from "./NotificationMenu";
import { UserProfileMenu } from "../UserProfileMenu";
import { useLocation } from "react-router-dom";
import { OPACITY_TO_HEX } from "../../../../shared/constants/common";

const DEFAULT_POS = -1;
export const HeaderDesktop = () => {
  const [pos, setPos] = useState(DEFAULT_POS);

  const onCloseSubMenu = () => {
    setPos(DEFAULT_POS);
  };

  const location = useLocation();
  console.log(location);
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
          <BoxItem flexBasis={{ sm: "30%", md: "20%", lg: "20%" }}>
            <LinkCustom to="/">
              <Typography
                variant="h1"
                style={{ color: "white", fontWeight: 900, fontSize: 24 }}
              >
                Delco Egg Admin
              </Typography>
            </LinkCustom>
          </BoxItem>

          <BoxItem flexBasis={"70%"}>
            <Stack
              alignItems={"center"}
              justifyContent={"flex-start"}
              direction={"row"}
              spacing={{ sm: 1, md: 2, lg: 3 }}
            >
              {items.map((item, index) => {
                let active = false;
                if (item.path == location.pathname || location.pathname.includes(item.path)) active = true
                
                return (
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
                    <ItemBox active={active} component={"div"}>
                      <Stack direction="row">
                        <ItemText>{item.text}</ItemText>
                        {item?.children && (
                          <IcBaselineArrowDropDown
                            fontSize={20}
                            color="white"
                          />
                        )}
                      </Stack>
                    </ItemBox>
                    <Box position={"relative"}>
                      {item?.children && index === pos && (
                        <SubHeader
                          items={item.children}
                          onClose={onCloseSubMenu}
                        />
                      )}
                    </Box>
                  </LinkCustom>
                );
              })}
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
      {items.map((item) => {
        let active = false;
        if (item.path == location.pathname || location.pathname.includes(item.path)) active = true

        return (
          <LinkCustom to={item.path}>
            <ItemBox active={active} component={"div"} onClick={onClose}>
              <ItemText>{item.text}</ItemText>
            </ItemBox>
          </LinkCustom>
        );
      })}
    </Paper>
  );
};

const BoxItem = styled(Box)({
  // flexBasis: "33%",
});

const ItemText = styled(Typography)(({ theme }) => ({
  color: "whitesmoke",
  fontSize: 20,
  fontWeight: 500,
  [theme.breakpoints.down("xl")]: {
    fontSize: 18,
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: 18,
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 18,
  },
}));

const ItemBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active, theme }) => ({
  width: "100%",
  cursor: "pointer",
  boxSizing: "border-box",

  "&:hover": { border: "1px solid white" },
  // border: `1px solid ${BACKGROUND_COLOR["HEADER"]}`,
  border: active ? "1px solid white" : `1px solid ${GREEN["900"]}${OPACITY_TO_HEX['0']}`,

  padding: '2px 4px',
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  transition: "all 0.25s",

  [theme.breakpoints.down("xl")]: {},
}));
