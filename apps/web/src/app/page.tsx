import { HeroEfficiency } from "@sectloom/components/src/sections/hero/hero-efficiency";
import { FooterProducts } from "@sectloom/components/src/sections/footer/footer-products";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <HeroEfficiency
        overline="SECTLOOM UI"
        heading="Production React sections for Next.js App Router"
        primaryCta={{ label: "Browse Components", href: "/components" }}
        secondaryCta={{ label: "View Documentation", href: "/docs" }}
        stats={[
          { label: "Components", value: "4+" },
          { label: "Dependencies", value: "0" },
          { label: "Quality", value: "100%" },
        ]}
      />

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-24 flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-8 tracking-tight">Why Sectloom?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-border rounded-xl bg-accent/20">
            <h3 className="font-medium text-lg mb-2">Registry Driven</h3>
            <p className="text-muted-foreground">Components are distributed via a high-performance static registry. Install them via our CLI instantly into your project.</p>
          </div>
          <div className="p-6 border border-border rounded-xl bg-accent/20">
            <h3 className="font-medium text-lg mb-2">Tailwind v4</h3>
            <p className="text-muted-foreground">Built to leverage the future of Tailwind. Our semantic CSS variables ensure pristine dark/light mode compatibility.</p>
          </div>
          <div className="p-6 border border-border rounded-xl bg-accent/20">
            <h3 className="font-medium text-lg mb-2">Strict Contracts</h3>
            <p className="text-muted-foreground">Every component is validated against strict JSON schemas and strictly typed props, ensuring total reliability.</p>
          </div>
        </div>
        
        <Link href="/components" className="mt-12 text-primary font-medium hover:underline">
          Explore the component gallery &rarr;
        </Link>
      </div>

      <FooterProducts
        brand={{
          name: "Sectloom",
          description: "Distributing production-ready sections for modern React applications.",
          certification: "Built for Next.js"
        }}
        navigation={[
          { label: "Components", href: "/components" },
          { label: "Documentation", href: "/docs" },
          { label: "GitHub", href: "https://github.com/nasyx-rakeeb/sectloom" },
        ]}
        enterpriseCta={{ label: "Contact Sales", href: "/contact" }}
        linkGroups={[]}
        socials={[]}
        legal={{ privacyHref: "/privacy", termsHref: "/terms", copyright: "© 2026 Sectloom. All rights reserved." }}
      />
    </main>
  );
}
