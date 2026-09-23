/**
 * VivahLook / Vaaraa — Client-side usage tracking.
 *
 * Tracks free generation count in localStorage for guest users.
 * In local development (localhost), limits are bypassed so you can test freely.
 */

import { usageConfig } from "@/config/wedding";

const STORAGE_KEY = "vivahlook_usage";

type UsageData = {
  generationsUsed: number;
  lastResetDate: string;
};

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function isLocalhost(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.endsWith(".local")
  );
}

function getUsageData(): UsageData {
  if (typeof window === "undefined") {
    return { generationsUsed: 0, lastResetDate: getTodayDate() };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as UsageData;
      return data;
    }
  } catch {
    // Corrupted data, reset
  }

  return { generationsUsed: 0, lastResetDate: getTodayDate() };
}

function saveUsageData(data: UsageData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

export function getGenerationsUsed(): number {
  return getUsageData().generationsUsed;
}

export function getRemainingLooks(): number {
  if (isLocalhost()) {
    // Unlimited testing during local development
    return 99;
  }
  const used = getGenerationsUsed();
  return Math.max(0, usageConfig.freeGenerationLimit - used);
}

export function hasReachedLimit(): boolean {
  if (isLocalhost()) {
    // Never block local developers
    return false;
  }
  return getRemainingLooks() <= 0;
}

export function incrementUsage(): void {
  const data = getUsageData();
  data.generationsUsed += 1;
  saveUsageData(data);
}

export function resetUsage(): void {
  saveUsageData({ generationsUsed: 0, lastResetDate: getTodayDate() });
}
