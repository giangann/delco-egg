import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Box } from "@mui/material";
import { Header } from "./Header/Header";

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
