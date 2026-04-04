import { clerkPricingAppearance } from "@/lib/clerk-pricing-appearence";
import { PricingTable } from "@clerk/nextjs";

export function PricingSection() {
  const isClerkBillingEnabled = process.env.NEXT_PUBLIC_CLERK_BILLING_ENABLED === "true";

  return (
    <section id="pricing" className="section-shell mt-6 px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="caps-sm text-sm font-semibold uppercase text-primary">Pricing</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
            Simple plans for every creator
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
            Pick Free, Pro, or Studio. Upgrade or change anytime from your account.
          </p>
        </div>

        <div className="w-full rounded-[1.75rem] border border-border/60 bg-card/40 p-4 sm:p-6 lg:p-8">
          {isClerkBillingEnabled ? (
            <PricingTable for="user" appearance={clerkPricingAppearance} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border/60 bg-background/50 p-8 text-center">
              <p className="text-lg font-medium text-foreground">Pricing table is temporarily hidden</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Clerk Billing is disabled in this environment. Set
                <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">
                  NEXT_PUBLIC_CLERK_BILLING_ENABLED=true
                </code>
                after enabling billing in Clerk dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}