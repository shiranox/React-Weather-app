const vars = {
  // Website
  SITE_NAME: "WeatherApp",
  BASE_API: "http://dataservice.accuweather.com",

  // Errors
  CONNECTION_ERROR: "Could not connect to server",
  SERVER_ERROR: "Internal server error",

  TEL_AVIV_KEY: "215854",
  CITY_TITLE: "Tel Aviv",

  API_KEY: "E3uW7hCdQsYzBnmHG45lXDFVA5vXGK0H",

  types: {
    Fahrenheit: {
      title: "Fahrenheit",
      icon: "°F",
      unit: "Imperial",
      action: false,
    },
    Celsius: {
      title: "Celsius",
      icon: "°C",
      unit: "Metric",
      action: true,
    },
  },
};

export default vars;
