import Favorites from "./screens/Favorites";
import Home from "./screens/Home";
import Header from "./components/HeaderComponent";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import routes from "./routes";

function App() {
  const actions = [
    {
      title: "Home",
      route: routes.HOME,
    },
    {
      title: "Favorites",
      route: routes.FAVORITES,
    },
  ];

  const publicRoutes = [
    <Route key="Home" exact path={routes.HOME} element={<Home />} />,
    <Route
      key="Favorites"
      exact
      path={routes.FAVORITES}
      element={<Favorites />}
    />,
  ];

  return (
    <Router>
      <Header actions={actions} />
      <Routes>{publicRoutes}</Routes>
    </Router>
  );
}

export default App;
