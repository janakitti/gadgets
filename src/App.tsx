import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Title } from "@mantine/core";

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
      <div className="App">
        <header className="App-header">
          <Title>Hello</Title>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </MantineProvider>
  );
}

export default App;
