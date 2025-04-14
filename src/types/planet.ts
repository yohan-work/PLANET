export interface Planet {
  id: string;
  name: string;
  radius: number;
  distance: number;
  color: string;
  orbitPeriod: number;
  rotationPeriod: number;
  info: {
    size: string;
    distanceFromSun: string;
    orbitalPeriod: string;
    description: string[];
  };
} 