import "./App.css";
import { Form } from "./components/form/Form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FE5454",
      },
      secondary: {
        main: "#11cb5f",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Form />
      </div>
    </ThemeProvider>
  );
}

export default App;
