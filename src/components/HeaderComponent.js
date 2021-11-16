import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { setTempType } from "../store/temperatureType";
import tempTypes from "../constants/globalConstants";

function HeaderComponent({ actions }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { temperatureType } = useSelector((state) => state.temperature);

  return (
    <Container>
      <h2>Weather App</h2>
      <Flex>
        <Switcher selected={temperatureType} />
        <Text
          onClick={() => dispatch(setTempType(tempTypes.types.Fahrenheit))}
          selected={temperatureType.title === tempTypes.types.Fahrenheit.title}
        >
          °F
        </Text>
        <Text
          onClick={() => dispatch(setTempType(tempTypes.types.Celsius))}
          selected={temperatureType.title === tempTypes.types.Celsius.title}
        >
          °C
        </Text>
      </Flex>
      <Buttons>
        {actions.map((navItem) => {
          return (
            <NavLink
              selected={location.pathname === navItem.route}
              to={navItem.route}
            >
              {navItem.title}
            </NavLink>
          );
        })}
      </Buttons>
    </Container>
  );
}

export default HeaderComponent;
const Container = styled.div`
  min-height: 80px;
  background-color: #f8f8f8;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;
const NavLink = styled(Link)`
  padding: 10px 20px;
  text-decoration: none;
  color: ${({ selected }) => (selected ? "#84a4fc" : "#444444")};
  font-weight: 600;
  flex: 1 0 40px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  border-radius: 25px;
  background: #84a4fc;
  height: 47px;
  min-width: 150px;
  padding: 2px 0;
  position: relative;
`;

const Switcher = styled.div`
  background: white;
  border-radius: 21px;
  height: 41px;
  line-height: 41px;
  width: 50%;
  top: 5px;
  cursor: pointer;
  position: absolute;
  transition: 0.5s;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  z-index: 1;
  left: ${({ selected }) =>
    selected === tempTypes.types.Fahrenheit ? "5px" : "70px"};
`;

const Text = styled.div`
  color: ${({ selected }) => (selected ? "#84a4fc" : "white")};
  font-size: 18px;
  font-weight: 600;
  line-height: 45px;
  width: 50%;
  text-align: center;
  z-index: 999;
  cursor: pointer;
`;
