import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 flex flex-col items-center justify-center px-6 text-center border-b border-border/40">
        <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-4">
          SECTLOOM UI
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl">
          Production React sections for Next.js App Router
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Link
            href="/components"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Browse Components
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border/50"
          >
            View Documentation
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-8 sm:gap-16 pt-8 border-t border-border/20 text-left w-full max-w-3xl">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">Components</span>
            <span className="text-3xl font-semibold">4+</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">Dependencies</span>
            <span className="text-3xl font-semibold">0</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-sm">Quality</span>
            <span className="text-3xl font-semibold">100%</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Simple Footer */}
      <footer className="border-t border-border/40 py-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-semibold">Sectloom</span>
            <Link href="/components" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Components</Link>
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
            <Link href="https://github.com/nasyx-rakeeb/sectloom" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</Link>
          </div>
          <span className="text-sm text-muted-foreground">© 2026 Sectloom. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
