import { Box, IconButton, Typography } from "@mui/material";
import {
  IconParkHamburgerButton,
  IconamoonProfileCircleFill,
  MaterialSymbolsNotificationsActiveRounded,
} from "../../shared/icons/Icon";

export const HeaderDesktop = () => {
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
      <Box>
        <Typography
          variant="h1"
          style={{ color: "white", fontWeight: 900, fontSize: 18 }}
        >
          Delco Egg
        </Typography>
      </Box>
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
