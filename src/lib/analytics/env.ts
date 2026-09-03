export function isPlausibleConfigured() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return Boolean(domain && !domain.includes("example.com"));
}

export function isGaConfigured() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return Boolean(id && id.startsWith("G-"));
}

export function isAnalyticsConfigured() {
  return isPlausibleConfigured() || isGaConfigured();
}
