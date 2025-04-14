import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Planet as PlanetType } from '../types/planet';

interface PlanetProps {
  planet: PlanetType;
  isSelected: boolean;
  onClick: () => void;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface PlanetCircleProps {
  radius: number;
  color: string;
  rotationPeriod: number;
  isSelected: boolean;
}

const PlanetCircle = styled.div<PlanetCircleProps>`
  width: ${(props) => props.radius * 2}px;
  height: ${(props) => props.radius * 2}px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  animation: ${rotate} ${(props) => props.rotationPeriod * 10}s linear infinite;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: ${(props) => props.isSelected ? '0 0 20px 5px rgba(255, 255, 255, 0.7)' : 'none'};
  z-index: ${(props) => props.isSelected ? 10 : 1};
`;

const Planet: React.FC<PlanetProps> = ({ planet, isSelected, onClick }) => {
  return (
    <PlanetCircle
      radius={planet.radius}
      color={planet.color}
      rotationPeriod={planet.rotationPeriod}
      isSelected={isSelected}
      onClick={onClick}
    />
  );
};

export default Planet; 