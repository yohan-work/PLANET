import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { Planet as PlanetType } from "../types/planet";

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

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
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
  box-shadow: ${(props) =>
    props.isSelected ? "0 0 20px 5px rgba(255, 255, 255, 0.7)" : "none"};
  z-index: ${(props) => (props.isSelected ? 10 : 1)};
  position: relative;

  ${(props) =>
    props.isSelected &&
    css`
      animation: ${pulse} 2s ease-in-out infinite,
        ${rotate} ${props.rotationPeriod * 10}s linear infinite;
    `}

  &:hover {
    transform: scale(1.1);
  }
`;

// 행성 확대 모달
const PlanetModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  max-height: 90%;
`;

const EnlargedPlanet = styled.div<{ color: string; size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-bottom: 20px;
  animation: ${rotate} 20s linear infinite;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 18px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Planet: React.FC<PlanetProps> = ({ planet, isSelected, onClick }) => {
  const [showModal, setShowModal] = useState(false);

  const handlePlanetClick = () => {
    onClick();
    // 태양이 아닌 행성을 클릭하면 모달 표시
    if (planet.id !== "sun") {
      setShowModal(true);
    }
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(false);
  };

  return (
    <>
      <PlanetCircle
        radius={planet.radius}
        color={planet.color}
        rotationPeriod={planet.rotationPeriod}
        isSelected={isSelected}
        onClick={handlePlanetClick}
      />

      {showModal && (
        <PlanetModal onClick={closeModal}>
          <CloseButton onClick={closeModal}>×</CloseButton>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <EnlargedPlanet color={planet.color} size={planet.radius * 10} />
            <h2 style={{ color: "white", marginBottom: "10px" }}>
              {planet.name}
            </h2>
            <div
              style={{ color: "white", maxWidth: "600px", textAlign: "center" }}
            >
              <p>{planet.info.size}</p>
              <p>{planet.info.distanceFromSun}</p>
              <p>{planet.info.orbitalPeriod}</p>
              {planet.info.description.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}
            </div>
          </ModalContent>
        </PlanetModal>
      )}
    </>
  );
};

export default Planet;
