import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { AppShell } from "@mantine/core";
import Gallery from "./Gallery";

const theme = createTheme({
  fontFamily: "Poppins, Open Sans, sans-serif",
  colors: {
    purple: [
      "#f4e9ff",
      "#e3cfff",
      "#c19bff",
      "#9f64ff",
      "#8236ff",
      "#7018ff",
      "#6707ff",
      "#5500e5",
      "#4c00cd",
      "#4000b4",
    ],
  },
  primaryColor: "purple",
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell padding="md">
        <AppShell.Main>
          <Gallery />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
