import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Planet as PlanetType } from '../types/planet';
import Planet from './Planet';

interface OrbitProps {
  planet: PlanetType;
  isSelected: boolean;
  onPlanetClick: (id: string) => void;
}

const revolve = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

interface OrbitCircleProps {
  distance: number;
  orbitPeriod: number;
}

const OrbitCircle = styled.div<OrbitCircleProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => props.distance * 2}px;
  height: ${(props) => props.distance * 2}px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  animation: ${revolve} ${(props) => props.orbitPeriod * 0.05}s linear infinite;
  z-index: 1;
`;

const PlanetContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Orbit: React.FC<OrbitProps> = ({ planet, isSelected, onPlanetClick }) => {
  if (planet.distance === 0) {
    // 태양(중심)의 경우 궤도 없이 행성만 표시
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Planet 
          planet={planet} 
          isSelected={isSelected} 
          onClick={() => onPlanetClick(planet.id)} 
        />
      </div>
    );
  }

  return (
    <OrbitCircle distance={planet.distance} orbitPeriod={planet.orbitPeriod}>
      <PlanetContainer>
        <Planet 
          planet={planet} 
          isSelected={isSelected} 
          onClick={() => onPlanetClick(planet.id)} 
        />
      </PlanetContainer>
    </OrbitCircle>
  );
};

export default Orbit; 