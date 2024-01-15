import { Box, IconButton, Typography } from "@mui/material";
import {
  IconParkHamburgerButton,
  IconamoonProfileCircleFill,
  MaterialSymbolsNotificationsActiveRounded,
} from "../../shared/icons/Icon";
import { LinkCustom } from "../../styled/styled";

export const HeaderMobile = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "green",
      }}
    >
      <Box>
        <IconButton>
          <IconParkHamburgerButton style={{ color: "black" }} />
        </IconButton>
      </Box>
      <LinkCustom to="/">
        <Typography
          variant="h1"
          style={{ color: "white", fontWeight: 900, fontSize: 18 }}
        >
          Delco Egg
        </Typography>
      </LinkCustom>
      <Box>
        <IconButton>
          <MaterialSymbolsNotificationsActiveRounded
            style={{ color: "white" }}
          />
        </IconButton>

        <IconButton>
          <IconamoonProfileCircleFill style={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
