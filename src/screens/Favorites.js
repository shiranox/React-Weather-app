import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LocationItem from "../components/WeatherItem";
import routes from "../routes";

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites } = useSelector((state) => state.favorites);
  const { temperatureType } = useSelector((state) => state.temperature);

  const handleNavigate = (id) => {
    navigate(routes.HOME, { state: { id } });
  };

  return (
    <Container>
      <Inner>
        <h2>Favorites</h2>
        <>
          {Object.keys(favorites).length ? (
            <Flex>
              {Object.keys(favorites).map((key) => {
                return (
                  <LocationItem
                    id={key}
                    title={favorites[key].LocalizedName}
                    deg={
                      favorites[key].data.Temperature[temperatureType.unit]
                        ?.Value
                    }
                    tempIcon={temperatureType.icon}
                    image={`https://developer.accuweather.com/sites/default/files/0${favorites[key].data.WeatherIcon}-s.png`}
                    subTitle={favorites[key].data.WeatherText}
                    onPress={handleNavigate}
                  />
                );
              })}
            </Flex>
          ) : (
            <h4>No favorties...</h4>
          )}
        </>
      </Inner>
    </Container>
  );
};

export default Favorites;
const Container = styled.div`
  height: calc(100% - 100px);
  background-color: rgba(132, 164, 252, 0.5);
  position: relative;
  z-index: 9999;
`;

const Inner = styled.div`
  padding: 30px 20px;
`;

const Flex = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  column-gap: 20px;
  row-gap: 20px;
  width: 70%;
  margin: auto;
`;
