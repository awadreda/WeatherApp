import './App.css'
import { Container, createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

const Theme = createTheme({
  typography: {
    fontFamily: "IBM, Arial, sans-serif",
  },
});

function App() {

  return (
    <ThemeProvider theme={Theme}>
      <>
      <Container  maxWidth="sm" style={{margin:"0px auto", background:"blue"}} >

      <h2>lgdajsga;sgas;ajdas;jfsajf;sadfsdafsaf <br />asdfasfsafsafa;jfdsaljfsadf</h2>

      </Container >

      </>
    </ThemeProvider>
  );
}

export default App
