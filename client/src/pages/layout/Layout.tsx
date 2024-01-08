import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  useEffect(() => {
    console.log("layout rendered");
  }, []);
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "pink" }}>
      <p>This is Layout</p>
      <Outlet/>
    </div>
  );
};
