import React from 'react';
import styled from 'styled-components';
import { Planet } from '../types/planet';

interface PlanetInfoProps {
  planet: Planet;
}

const InfoContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 350px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const Title = styled.h2`
  color: #FFC107;
  margin-top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
`;

const InfoItem = styled.div`
  margin-bottom: 8px;
`;

const InfoLabel = styled.h3`
  margin: 15px 0 5px 0;
  color: #4FC3F7;
  font-size: 16px;
`;

const Description = styled.p`
  margin: 5px 0;
  line-height: 1.4;
`;

const PlanetInfo: React.FC<PlanetInfoProps> = ({ planet }) => {
  return (
    <InfoContainer>
      <Title>{planet.name}</Title>
      
      <InfoItem>{planet.info.size}</InfoItem>
      <InfoItem>{planet.info.distanceFromSun}</InfoItem>
      <InfoItem>{planet.info.orbitalPeriod}</InfoItem>
      
      <InfoLabel>Information about {planet.name}</InfoLabel>
      {planet.info.description.map((desc, index) => (
        <Description key={index}>{desc}</Description>
      ))}
    </InfoContainer>
  );
};

export default PlanetInfo; 