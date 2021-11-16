import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { addToFavorites, removeFavorites } from "../store/favorites";
import WeatherItem from "./WeatherItem";

const DailyWeather = () => {
  const dispatch = useDispatch();
  const [inFavorites, setInFavorites] = useState(false);
  const { error, errors, loading, dailyWeather, currentWeather } = useSelector(
    (state) => state.weather
  );
  const { currentLocation } = useSelector((state) => state.location);
  const { favorites } = useSelector((state) => state.favorites);
  const { temperatureType } = useSelector((state) => state.temperature);

  useEffect(() => {
    if (favorites[currentLocation?.Key]) setInFavorites(true);
    else setInFavorites(false);
  }, [favorites, currentLocation]);

  const getDay = (date) => {
    const d = moment(date).format("dddd");
    return d;
  };

  const handleToggleFavorites = () => {
    if (favorites && favorites[currentLocation.Key]) {
      dispatch(removeFavorites(currentLocation));
    } else dispatch(addToFavorites(currentLocation));
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : errors ? (
        <div>{error}</div>
      ) : (
        dailyWeather &&
        currentLocation &&
        currentWeather && (
          <Container>
            <Top>
              <div>
                <div>{currentLocation.LocalizedName}</div>
                <div>
                  {currentWeather.Temperature[temperatureType.unit]?.Value}{" "}
                  {temperatureType.icon}‏
                </div>
              </div>
              <AddButton onClick={handleToggleFavorites}>
                {inFavorites ? (
                  <div>Remove from favorites</div>
                ) : (
                  <div>Add to favorites</div>
                )}
              </AddButton>
            </Top>
            <div>
              <h1>{currentWeather?.WeatherText}</h1>
            </div>
            <Flex>
              {dailyWeather.DailyForecasts.map((item) => {
                return (
                  <WeatherItem
                    tempIcon={temperatureType.icon}
                    key={item.EpochDate}
                    deg={item.Temperature.Maximum.Value}
                    title={getDay(item.Date)}
                    image={`https://developer.accuweather.com/sites/default/files/0${item.Day.Icon}-s.png`}
                    onPress={() => {
                      return null;
                    }}
                  />
                );
              })}
            </Flex>
          </Container>
        )
      )}
    </>
  );
};

export default DailyWeather;

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  min-height: 500px;
  width: 80%;
  margin: 40px auto;
  background: white;
  padding: 20px;
  position: relative;
`;

const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  text-align: left;
`;

const Flex = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  column-gap: 20px;
  row-gap: 20px;
  margin-top: 35px;
`;

const AddButton = styled.div`
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  padding: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.32);
  }
`;
