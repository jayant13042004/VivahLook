import { modulesConfig } from "@/config/modules";
import { isGaConfigured, isPlausibleConfigured } from "@/lib/analytics/env";

/** Loads Plausible and/or GA4 only when the module is on and env is set. */
export function Analytics() {
  if (!modulesConfig.analytics) return null;

  return (
    <>
      {isPlausibleConfigured() ? (
        <script
          defer
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
      ) : null}
      {isGaConfigured() ? (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`,
            }}
          />
        </>
      ) : null}
    </>
  );
}
