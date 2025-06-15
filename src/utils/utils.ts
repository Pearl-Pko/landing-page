import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function transformRange(
  value: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number {
  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;

  // Normalize value to 0–1 within the input range
  const t = (value - inMin) / (inMax - inMin);

  // Clamp the normalized value to stay within 0–1
  const clampedT = Math.max(0, Math.min(1, t));

  // Interpolate in the output range
  return outMin + clampedT * (outMax - outMin);
}

export function floatGreaterThan(a: number, b: number, epsilon = 1e-6) {
  return a - b > epsilon;
}
