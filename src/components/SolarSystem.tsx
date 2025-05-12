import React, { useState } from 'react';
import styled from 'styled-components';
import { planets } from '../data/planets';
import Orbit from './Orbit';
import PlanetInfo from './PlanetInfo';

const SolarSystemContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000316;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SolarSystemContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlanetNavigation = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
`;

const NavButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) => props.isSelected ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.7)'};
  color: white;
  border: none;
  padding: 8px 16px;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

// 별 생성을 위한 컴포넌트
const StarField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

interface StarProps {
  top: string;
  left: string;
  size: string;
  opacity: string;
}

const Star = styled.div<StarProps>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: #ffffff;
  border-radius: 50%;
  opacity: ${(props) => props.opacity};
`;

const SolarSystem: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0].id);

  // 랜덤 별 생성
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const size = `${Math.random() * 2 + 1}px`;
      const opacity = `${Math.random() * 0.8 + 0.2}`;
      
      stars.push(
        <Star 
          key={i}
          top={top}
          left={left}
          size={size}
          opacity={opacity}
        />
      );
    }
    return stars;
  };

  const handlePlanetClick = (planetId: string) => {
    setSelectedPlanet(planetId);
  };

  const selectedPlanetData = planets.find(planet => planet.id === selectedPlanet)!;

  return (
    <SolarSystemContainer>
      <StarField>
        {renderStars()}
      </StarField>
      
      <SolarSystemContent>
        {planets.map((planet) => (
          <Orbit 
            key={planet.id}
            planet={planet}
            isSelected={selectedPlanet === planet.id}
            onPlanetClick={handlePlanetClick}
          />
        ))}
      </SolarSystemContent>

      <PlanetNavigation>
        {planets.map((planet) => (
          <NavButton 
            key={planet.id}
            isSelected={selectedPlanet === planet.id}
            onClick={() => setSelectedPlanet(planet.id)}
          >
            {planet.name}
          </NavButton>
        ))}
      </PlanetNavigation>

      <PlanetInfo planet={selectedPlanetData} />
    </SolarSystemContainer>
  );
};

export default SolarSystem; 