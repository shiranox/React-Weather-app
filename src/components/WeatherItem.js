import React from "react";
import styled from "styled-components";

const WeatherItem = ({
  id,
  image,
  title,
  subTitle,
  deg,
  onPress,
  tempIcon,
}) => {
  return (
    <Container onClick={() => onPress(id)}>
      <div>{title}</div>
      <div>
        {deg} {tempIcon}
      </div>
      <Icon>
        <img src={image} alt="icon" />
      </Icon>
      {subTitle && <div>{subTitle}</div>}
    </Container>
  );
};

export default WeatherItem;

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  flex: 1 0 150px;
  min-height: 130px;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 10px;
  line-height: 30px;
  background: white;
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    transform: scale(1.1);
  }
`;
const Icon = styled.div`
  height: 45px;
  width: 75px;
  margin: auto;
`;
