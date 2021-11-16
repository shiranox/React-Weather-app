import React, { useState, useEffect } from "react";
import { getLocations, setCurrentLocation } from "../store/location";
import { getCurrentWeather } from "../store/weather";
import { getDailyWeather } from "../store/weather";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import DailyWeather from "../components/DailyWeather";
import constants from "../constants/globalConstants";

const Home = () => {
  const { locations } = useSelector((state) => state.location);
  const { temperatureType } = useSelector((state) => state.temperature);
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state && location.state.id !== "undefined") {
      getCityData(location.state.id);
    } else {
      getCityData(constants.TEL_AVIV_KEY);
    }
  }, []);

  const getCityData = (key) => {
    dispatch(setCurrentLocation(key));
    dispatch(getDailyWeather(key, temperatureType.action));
    dispatch(getCurrentWeather(key));
  };

  const handleSearch = (e) => {
    const letters = /^[A-Za-z]+$/;
    console.log(e.target.value === "");
    if (e.target.value.match(letters) || e.target.value === "") {
      setShowDropDown(true);
      setSearch(e.target.value);
      dispatch(getLocations(e.target.value));
    } else return;
  };

  const handleSelectCity = (city) => {
    setShowDropDown(false);
    setSearch(city.LocalizedName);
    getCityData(city.Key);
  };

  return (
    <Container onClick={() => setShowDropDown(false)}>
      <Inner>
        <SearchDiv>
          <SearchInput
            showDropDown={showDropDown}
            onChange={handleSearch}
            value={search}
            placeholder="Search..."
          />
          <FontAwesomeIcon icon={faSearch} />
        </SearchDiv>
        {showDropDown && locations && locations.length !== 0 && (
          <DropDown>
            {locations.map((location) => {
              return (
                <LocationItem
                  key={location.Key}
                  onClick={() => handleSelectCity(location)}
                >
                  {location.LocalizedName}
                </LocationItem>
              );
            })}
          </DropDown>
        )}

        <DailyWeather />
      </Inner>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  height: calc(100% - 100px);
  background-color: rgba(132, 164, 252, 0.5);
  position: relative;
  z-index: 9999;
`;
const Inner = styled.div`
  padding: 30px 20px;
`;
const SearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ showDropDown }) =>
    showDropDown ? "10px 10px 0 0" : "10px"};
  padding: 10px 15px;
  outline: none;
  border: none;
  min-width: 200px;
  width: 30%;
  margin: auto;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 1;
  background: white;
`;
const SearchInput = styled.input`
  border: none;
  width: 80%;
  outline: none;
`;
const DropDown = styled.div`
  width: calc(30% - 20px);
  background: white;
  margin: auto;
  min-width: 200px;
  left: 0;
  right: 0;
  padding: 10px 10px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  height: 170px;
  overflow-y: auto;
  text-align: left;
  z-index: 1;
  position: absolute;
`;
const LocationItem = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f3f2f2;
  }
`;
