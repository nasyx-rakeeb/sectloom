import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FooterProducts } from "@sectloom/components/src/sections/footer/footer-products";
import type { RegistryItem } from "@sectloom/contracts/src/registry";
import { codeToHtml } from "shiki";

async function getRegistryIndex(): Promise<any[]> {
  const registryPath = path.join(process.cwd(), "../../packages/registry/public/index.json");
  const data = await fs.readFile(registryPath, "utf-8");
  return JSON.parse(data);
}

async function getComponentData(name: string): Promise<RegistryItem | null> {
  try {
    const componentPath = path.join(process.cwd(), `../../packages/registry/public/${name}.json`);
    const data = await fs.readFile(componentPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
}

export async function generateStaticParams() {
  const registry = await getRegistryIndex();
  return registry.map((comp) => ({
    category: comp.category,
    name: comp.name,
  }));
}

export async function generateMetadata({ params }: { params: { category: string; name: string } }) {
  const comp = await getComponentData(params.name);
  if (!comp) return { title: "Not Found" };
  return {
    title: `${comp.name} - Sectloom`,
    description: comp.description,
  };
}

export default async function ComponentDetailPage({
  params,
}: {
  params: { category: string; name: string };
}) {
  const comp = await getComponentData(params.name);
  
  if (!comp || comp.category !== params.category) {
    notFound();
  }

  const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://sectloom.vercel.app/registry";
  
  // Highlight the code using shiki
  const htmlCode = await codeToHtml(comp.files[0].content, {
    lang: "tsx",
    theme: "github-dark-default",
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border py-6 px-6 sm:px-12 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight">Sectloom</Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/components" className="hover:text-primary text-muted-foreground">Components</Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-medium">
            <Link href="/components" className="hover:text-foreground transition-colors">Components</Link>
            <span>/</span>
            <span className="capitalize">{comp.category}</span>
            <span>/</span>
            <span className="text-foreground">{comp.name}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{comp.name}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">{comp.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-6">Preview</h2>
              <div className="border border-border rounded-xl overflow-hidden bg-accent/10 relative h-[600px]">
                {comp.previewAssets && comp.previewAssets.length > 0 ? (
                  <Image 
                    src={comp.previewAssets[0].url} 
                    alt={comp.name} 
                    fill
                    className="object-contain" 
                  />
                ) : (
                  <div className="p-24 text-center text-muted-foreground">No preview available</div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">Installation</h2>
              <div className="bg-[#0d1117] text-white p-4 rounded-xl border border-border overflow-x-auto font-mono text-sm relative">
                <code>npx sectloom add {comp.name}</code>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">Code</h2>
              <div className="rounded-xl overflow-hidden border border-border [&>pre]:!p-6 [&>pre]:!bg-[#0d1117] [&>pre]:!m-0 text-sm" dangerouslySetInnerHTML={{ __html: htmlCode }} />
            </section>
          </div>

          <div className="space-y-8 lg:border-l lg:border-border lg:pl-12">
            <section>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Component Details</h3>
              <ul className="space-y-4 text-sm">

                <li>
                  <strong className="block font-medium text-foreground mb-1">Dependencies</strong>
                  {comp.dependencies && comp.dependencies.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {comp.dependencies.map(d => (
                        <span key={d} className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-mono">{d}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">None</span>
                  )}
                </li>
                <li>
                  <strong className="block font-medium text-foreground mb-1">Required Tokens</strong>
                  {comp.requiredTokens && comp.requiredTokens.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {comp.requiredTokens.map(t => (
                        <span key={t} className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-mono">{t}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">None</span>
                  )}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <FooterProducts
        brand={{
          name: "Sectloom",
          description: "Distributing production-ready sections for modern React applications.",
          certification: "Built for Next.js"
        }}
        navigation={[
          { label: "Components", href: "/components" },
          { label: "Documentation", href: "/docs" },
          { label: "GitHub", href: "https://github.com/sectloom/sectloom" },
        ]}
        enterpriseCta={{ label: "Contact Sales", href: "/contact" }}
        linkGroups={[]}
        socials={[]}
        legal={{ privacyHref: "/privacy", termsHref: "/terms", copyright: "© 2026 Sectloom. All rights reserved." }}
      />
    </div>
  );
}
