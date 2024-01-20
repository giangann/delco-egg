import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { viVN as coreViVn } from "@mui/material/locale";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { viVN } from "@mui/x-date-pickers/locales";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { appRouters } from "./route/Route";
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";

function App() {
  const { checkUser } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      await checkUser();
      setLoading(false);
    };
    fetchUser();
  }, []);
  return (
    <div>
      <ThemeProvider theme={newTheme}>
        <LocalizationProvider
          // localeText={
          //   viVN.components.MuiLocalizationProvider.defaultProps.localeText
          // }
          dateAdapter={AdapterDayjs}
        >
          {loading ? "" : <RouterProvider router={appRouters} />}
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

const newTheme = (theme: ThemeOptions | undefined) =>
  createTheme(
    {
      ...theme,
      components: {
        MuiFab: {
          styleOverrides: {
            root: {
              zIndex: 1,
            },
          },
        },
      },
      // components: {
      //   MuiPickersToolbar: {
      //     styleOverrides: {
      //       content: {
      //         color: "#1565c0",
      //         borderRadius: 2,
      //         borderWidth: 1,
      //         borderColor: "#2196f3",
      //         border: "1px solid",
      //         backgroundColor: "#bbdefb",
      //       },
      //     },
      //   },
      // },
    },
    viVN,
    coreViVn
  );

export default App;
