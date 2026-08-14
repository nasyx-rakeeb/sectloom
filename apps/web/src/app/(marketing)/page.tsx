import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { WebSiteJsonLd, SoftwareApplicationJsonLd } from '@/lib/seo/json-ld';
import { ArrowRight, Terminal, Paintbrush, Shield, Code } from 'lucide-react';
import { CardCopyButton } from '@/components/catalog/card-copy-button';

export const metadata = {
  title: {
    absolute: 'Sectloom — Beautiful sections for Next.js',
  },
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <WebSiteJsonLd />
      <SoftwareApplicationJsonLd />
      <div className="container mx-auto relative px-4 pb-10 md:px-8">
        <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase mb-2">
            Open Source Section Library
          </span>
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Beautiful sections for Next.js
          </h1>
          <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl mt-4">
            Browse production-ready sections. Install editable TSX source code
            with one CLI command. Customize everything.
          </p>
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10 mt-6">
            <Button asChild size="lg">
              <Link href="/components/hero">
                Browse Sections <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/docs">Read Docs</Link>
            </Button>
          </div>

          <div className="mt-8 flex w-full flex-col items-center justify-center p-6 bg-muted/50 rounded-lg border border-border max-w-xl mx-auto">
            <p className="text-sm text-muted-foreground mb-4 font-medium">
              Quick start
            </p>
            <div className="flex w-full items-center justify-between bg-background rounded-md border border-border p-3 pl-4">
              <code className="text-sm sm:text-base font-mono flex items-center text-foreground overflow-hidden">
                <Terminal className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">
                  npx sectloom init && npx sectloom add hero-efficiency
                </span>
              </code>
              <CardCopyButton text="npx sectloom init && npx sectloom add hero-efficiency" />
            </div>
          </div>
        </section>

        <section className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-4 lg:gap-8 pt-10 pb-16">
          <div className="relative overflow-hidden rounded-lg border bg-background p-6 hover:bg-muted/50 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-primary/10 mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Source Code Ownership</h3>
            <p className="text-sm text-muted-foreground">
              You own the code. Every section is copied to your project as
              editable TSX.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-6 hover:bg-muted/50 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-primary/10 mb-4">
              <Paintbrush className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Exact Visual Fidelity</h3>
            <p className="text-sm text-muted-foreground">
              Install the section shown in the preview, with its distinctive
              styling preserved in editable source.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-6 hover:bg-muted/50 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-primary/10 mb-4">
              <Terminal className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">CLI Installation</h3>
            <p className="text-sm text-muted-foreground">
              One command to add any section. Dependencies are installed
              automatically.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-6 hover:bg-muted/50 transition-colors">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-primary/10 mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Type Safe</h3>
            <p className="text-sm text-muted-foreground">
              Full TypeScript support with documented props for every section.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
