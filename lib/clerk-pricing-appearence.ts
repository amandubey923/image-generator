/**
 * Dark + brand colors for `<PricingTable />` and billing checkout.
 * Uses appearance variable overrides to match this app’s `.dark` palette
 * (see `app/globals.css`) and orange primary color.
 *
 * @see https://clerk.com/docs/guides/customizing-clerk/appearance-prop/variables
 */
export const clerkPricingAppearance = {
  variables: {
    colorPrimary: "oklch(0.7357 0.1641 34.7091)",
    colorPrimaryForeground: "oklch(1 0 0)",
    colorBackground: "oklch(0.3184 0.0176 341.4465)",
    colorForeground: "oklch(0.9397 0.0119 51.3156)",
    colorInput: "oklch(0.3637 0.0203 342.2664)",
    colorInputForeground: "oklch(0.9397 0.0119 51.3156)",
    colorNeutral: "oklch(0.8378 0.0237 52.6346)",
  },
} as const;