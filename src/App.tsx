import "./App.css";
import {
  Button,
  Container,
  createTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CloudIcon from "@mui/icons-material/Cloud";
import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";


moment.locale("ar")

const Theme = createTheme({
  typography: {
    fontFamily: "IBM, Arial, sans-serif",
  },
});

type WeatherResponse = {
  data: {
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
    };

    weather: [
      {
        description: string;
        icon: string;
      }
    ];
  };
};

let cancelAxios: Canceler | null = null;
function App() {
  // Check if the screen is mobile-sized
  const isMobile = useMediaQuery("(max-width:600px)");
  const { t, i18n } = useTranslation(); 

  const [dateAndTime,setDateAndTime] = useState("");

  const initTemp: WeatherResponse = {
    data: {
      main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0,
      },

      weather: [{ description: "", icon: "" }],
    },
  };

  const [temp, setTemp] = useState(initTemp);
  const [locale,setLocale] =useState("ar");

  const directionLocale = locale ==="ar" ? "rtl" :"ltr";

  function handleLanguageClick() {

    if(locale == 'en')
    {
      setLocale("ar")
      i18n.changeLanguage("ar")
    }else
    {
      i18n.changeLanguage("en")
      setLocale("en");

    }
  }

  useEffect(() => {

    setDateAndTime(moment().format('MMM Do YYYY'));
axios
.get(
  `https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=e51f5e6afe1433a31b586d3cf1d50fb8`,
  {
    cancelToken: new axios.CancelToken((c) => {
      cancelAxios = c;
    }),
  }
)

.then((response: WeatherResponse) => {
  const resTempGenral = response.data.main.temp - 272.15;

  const newTemp: WeatherResponse = {
    data: {
      main: {
        temp: Math.round(resTempGenral),
        temp_max: Math.round(response.data.main.temp_max - 272.15),
        temp_min: Math.round(response.data.main.temp_min - 272.15),
      },
      weather: [
        {
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
        },
      ],
    },
  };

  console.log(newTemp)
  setTemp(newTemp);
})
.catch((error) => {
  console.log(error);
});

    return () => {
      if (cancelAxios !== null) cancelAxios();
    };
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Container maxWidth="sm" sx={{ padding: isMobile ? "10px" : "30px" }}>
        {/*===== Card ===== */}
        <div
          style={{
            backgroundColor: "#0000be",
            boxShadow: "inset rgb(0, 0, 255) 0px -4px 5px 1px",
            padding: isMobile ? "15px" : "20px",
              direction :directionLocale,
            borderRadius: "15px",
          }}
          id="card"
        >
          {/* City and Time */}
          <div
            dir={directionLocale}
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "start",
              marginRight: isMobile ? "10px" : "20px",
              // flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "10px" : "15px",
            }}
            id="city-time"
          >
            <Typography variant={isMobile ? "h3" : "h2"} fontWeight={900}>
              {t("Cario")}
            </Typography>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              marginRight={isMobile ? "0" : "20px"}
              fontWeight={900}
            >
              {dateAndTime}
            </Typography>
          </div>

          <hr />

          {/* Weather Details */}
          <div
            id="Image-descriptions"
            style={{
              display: "flex",
              justifyContent: "space-around",
              direction: directionLocale,
              // flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "center" : "flex-start",
              gap: isMobile ? "10px" : "0",
            }}
          >
            {/* Degree and Description */}
            <div id="degree-description" style={{ textAlign: "left" }}>
              <div
                id="icon-tmep"
                style={{
                  display: "flex",
                }}
              >
                <Typography fontWeight={900} variant={isMobile ? "h2" : "h1"}>
                  {temp.data.main.temp}°
                  <span style={{ fontSize: "30px" }}>C</span>
                </Typography>

                <img
                  style={{ padding: 0, width: "63px", height: "60px" }}
                  src={`https://openweathermap.org/img/wn/${temp.data.weather[0].icon}.png`}
                  alt=""
                />
              </div>
                
              <Typography style={{direction:directionLocale , textAlign:locale==="ar" ? "right":"left"}} variant={isMobile ? "body1" : "h6"}>
                {t(temp.data.weather[0].description)}
              </Typography>

              {/* Min and Max */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  direction: directionLocale,
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <h5>
                  {t("Min")} : {(temp.data.main.temp_min)}
                </h5>
                <h5>|</h5>
                <h5>
                  {t("Max")} : {temp.data.main.temp_max}
                </h5>
              </div>
            </div>

            {/* Cloud Icon */}
            <CloudIcon
              sx={{
                fontSize: isMobile ? "150px" : "200px",
                color: "white",
                // padding: isMobile ? "0" : "0px  0px 30px",
              }}
            />
          </div>
        </div>
        {/*===== Card ===== */}
        {/* ============ Button ============ */}
        <div dir={directionLocale} id="buttonStyleDev" style={{ display: "flex", marginTop: "5px" }}>
          <Button
          

            onClick={() => {
              handleLanguageClick();
            }}
            style={{ color: "rgb(108, 177, 255)" }}
            variant="text"
          >
            {locale == "ar" ? "انجليزي" : "Arabic"}
          </Button>
        </div>

        {/* ============ Button ============ */}
      </Container>
    </ThemeProvider>
  );
}

export default App;
