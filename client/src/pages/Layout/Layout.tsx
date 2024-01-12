import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  useEffect(() => {
    console.log("layout rendered");
  }, []);
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "white" }}>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
};
