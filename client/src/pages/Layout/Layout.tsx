import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";

export const Layout = () => {
  useEffect(() => {
    console.log("layout rendered");
  }, []);
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};
