// jest.d.ts
declare namespace jest {
  interface Matchers<R> {
    toBeOneOf(expected: any[]): R;
  }
}