// src/utils/windDirection.ts
export const calculateAngleDifference = (windDir: number, pointFacing: string): number => {
  const facingMap = {
    'N': 0, 'NE': 45, 'E': 90, 'SE': 135,
    'S': 180, 'SW': 225, 'W': 270, 'NW': 315
  };

  const pointAngle = facingMap[pointFacing as keyof typeof facingMap] || 0;
  let diff = Math.abs(windDir - pointAngle);

  // Handle circular nature of angles
  if (diff > 180) {
    diff = 360 - diff;
  }

  return diff;
};

export const evaluateWind = (windDirection: number, pointFacing: string): number => {
  const angleDiff = calculateAngleDifference(windDirection, pointFacing);

  if (angleDiff <= 45) return 15;  // オフショア
  if (angleDiff <= 135) return 5;  // サイド
  return -5;  // オンショア
};
