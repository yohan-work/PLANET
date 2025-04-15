import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { planets } from "../data/planets";
import Orbit from "./Orbit";
import PlanetInfo from "./PlanetInfo";

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

interface SolarSystemContentProps {
  scale: number;
  rotate: number;
}

const SolarSystemContent = styled.div<SolarSystemContentProps>`
  position: relative;
  width: 800px;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(${(props) => props.scale})
    rotate(${(props) => props.rotate}deg);
  transition: transform 0.3s ease;
`;

const PlanetNavigation = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
`;

const NavButton = styled.button<{ isSelected: boolean }>`
  background-color: ${(props) =>
    props.isSelected ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.7)"};
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

const ControlPanel = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 10px;
`;

const ControlButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const SolarSystem: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0].id);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // 랜덤 별 생성
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const size = `${Math.random() * 2 + 1}px`;
      const opacity = `${Math.random() * 0.8 + 0.2}`;

      stars.push(
        <Star key={i} top={top} left={left} size={size} opacity={opacity} />
      );
    }
    return stars;
  };

  // 줌 인/아웃 함수
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setScale(1);
    setRotate(0);
  };

  // 드래그 회전 기능
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setRotate((prev) => prev + deltaX * 0.5);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          // 다음 행성으로 이동
          const currentIndex = planets.findIndex(
            (planet) => planet.id === selectedPlanet
          );
          const nextIndex = (currentIndex + 1) % planets.length;
          setSelectedPlanet(planets[nextIndex].id);
          break;
        case "ArrowLeft":
          // 이전 행성으로 이동
          const currIndex = planets.findIndex(
            (planet) => planet.id === selectedPlanet
          );
          const prevIndex = (currIndex - 1 + planets.length) % planets.length;
          setSelectedPlanet(planets[prevIndex].id);
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "0":
          handleZoomReset();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPlanet]);

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleMouseUpGlobal);
    return () => {
      window.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, []);

  const handlePlanetClick = (planetId: string) => {
    setSelectedPlanet(planetId);
  };

  const selectedPlanetData = planets.find(
    (planet) => planet.id === selectedPlanet
  )!;

  return (
    <SolarSystemContainer
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <StarField>{renderStars()}</StarField>

      <SolarSystemContent
        ref={contentRef}
        scale={scale}
        rotate={rotate}
        onMouseDown={handleMouseDown}
        tabIndex={0}
      >
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

      <ControlPanel>
        <ControlButton onClick={handleZoomIn} title="Zoom In (+ key)">
          Zoom In
        </ControlButton>
        <ControlButton onClick={handleZoomOut} title="Zoom Out (- key)">
          Zoom Out
        </ControlButton>
        <ControlButton onClick={handleZoomReset} title="Reset (0 key)">
          Reset
        </ControlButton>
      </ControlPanel>

      <div
        style={{
          position: "absolute",
          bottom: "70px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          opacity: 0.7,
          fontSize: "14px",
        }}
      >
        Use arrow keys ← → to navigate between planets
      </div>

      <PlanetInfo planet={selectedPlanetData} />
    </SolarSystemContainer>
  );
};

export default SolarSystem;
