// __tests__/windDirection.test.ts
import { calculateAngleDifference, evaluateWind } from '@/utils/windDirection';

describe('Wind Direction Utils', () => {
  describe('calculateAngleDifference', () => {
    it('should calculate correct angle differences for cardinal directions', () => {
      expect(calculateAngleDifference(0, 'N')).toBe(0);
      expect(calculateAngleDifference(90, 'E')).toBe(0);
      expect(calculateAngleDifference(180, 'S')).toBe(0);
      expect(calculateAngleDifference(270, 'W')).toBe(0);
    });

    it('should calculate correct angle differences for intercardinal directions', () => {
      expect(calculateAngleDifference(45, 'NE')).toBe(0);
      expect(calculateAngleDifference(135, 'SE')).toBe(0);
      expect(calculateAngleDifference(225, 'SW')).toBe(0);
      expect(calculateAngleDifference(315, 'NW')).toBe(0);
    });

    it('should handle circular angle wrapping', () => {
      expect(calculateAngleDifference(350, 'N')).toBe(10);
      expect(calculateAngleDifference(10, 'N')).toBe(10);
      expect(calculateAngleDifference(270, 'N')).toBe(90);
      expect(calculateAngleDifference(90, 'N')).toBe(90);
    });

    it('should calculate 90-degree differences correctly', () => {
      expect(calculateAngleDifference(90, 'N')).toBe(90);
      expect(calculateAngleDifference(0, 'E')).toBe(90);
      expect(calculateAngleDifference(270, 'S')).toBe(90);
      expect(calculateAngleDifference(180, 'W')).toBe(90);
    });

    it('should calculate 180-degree differences correctly', () => {
      expect(calculateAngleDifference(180, 'N')).toBe(180);
      expect(calculateAngleDifference(270, 'E')).toBe(180);
      expect(calculateAngleDifference(0, 'S')).toBe(180);
      expect(calculateAngleDifference(90, 'W')).toBe(180);
    });

    it('should handle edge cases with angle wrapping', () => {
      expect(calculateAngleDifference(359, 'N')).toBe(1);
      expect(calculateAngleDifference(1, 'N')).toBe(1);
      expect(calculateAngleDifference(179, 'S')).toBe(1);
      expect(calculateAngleDifference(181, 'S')).toBe(1);
    });
  });

  describe('evaluateWind', () => {
    it('should return high score for offshore winds (same direction)', () => {
      expect(evaluateWind(225, 'SW')).toBe(15); // SW wind for SW facing
      expect(evaluateWind(0, 'N')).toBe(15); // N wind for N facing
      expect(evaluateWind(90, 'E')).toBe(15); // E wind for E facing
    });

    it('should return high score for near-offshore winds', () => {
      expect(evaluateWind(200, 'SW')).toBe(15); // Close to SW (225)
      expect(evaluateWind(250, 'SW')).toBe(15); // Close to SW (225)
      expect(evaluateWind(30, 'N')).toBe(15); // Close to N (0/360)
    });

    it('should return medium score for side winds', () => {
      expect(evaluateWind(135, 'SW')).toBe(5); // SE wind for SW facing (90° diff)
      expect(evaluateWind(315, 'SW')).toBe(5); // NW wind for SW facing (90° diff)
      expect(evaluateWind(90, 'N')).toBe(5); // E wind for N facing
    });

    it('should return negative score for onshore winds (opposite direction)', () => {
      expect(evaluateWind(45, 'SW')).toBe(-5); // NE wind for SW facing (180° diff)
      expect(evaluateWind(180, 'N')).toBe(-5); // S wind for N facing
      expect(evaluateWind(270, 'E')).toBe(-5); // W wind for E facing
    });

    it('should handle boundary conditions correctly', () => {
      // 45-degree boundary
      expect(evaluateWind(180, 'SW')).toBe(15); // 45° from SW (225)
      expect(evaluateWind(270, 'SW')).toBe(15); // 45° from SW (225)

      // 135-degree boundary
      expect(evaluateWind(90, 'SW')).toBe(5); // 135° from SW (225)
      expect(evaluateWind(360, 'SW')).toBe(5); // 135° from SW (225)
    });

    it('should work with all cardinal directions', () => {
      const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

      directions.forEach(direction => {
        const score = evaluateWind(0, direction);
        expect(score).toBeOneOf([15, 5, -5]);
      });
    });

    it('should handle invalid direction gracefully', () => {
      // Should default to 0 degrees for invalid facing
      const score = evaluateWind(0, 'INVALID' as any);
      expect(score).toBe(15);
    });
  });
});