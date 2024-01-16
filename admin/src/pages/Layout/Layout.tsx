import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Box } from "@mui/material";

export const Layout = () => {
  useEffect(() => {
    console.log("layout rendered");
  }, []);
  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};
