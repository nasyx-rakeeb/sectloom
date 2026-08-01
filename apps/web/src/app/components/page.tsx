import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "Components - Sectloom",
  description: "Browse the Sectloom component gallery.",
};

async function getRegistryIndex(): Promise<any[]> {
  const registryPath = path.join(process.cwd(), "../../packages/registry/public/index.json");
  const data = await fs.readFile(registryPath, "utf-8");
  return JSON.parse(data);
}

export default async function ComponentsPage() {
  const components = await getRegistryIndex();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border py-6 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight">Sectloom</Link>
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Component Gallery</h1>
          <p className="text-xl text-muted-foreground">Production-ready sections for your next project.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((comp) => (
            <Link 
              key={comp.name} 
              href={`/components/${comp.category}/${comp.name}`}
              className="group border border-border rounded-xl overflow-hidden hover:border-primary transition-colors bg-accent/5"
            >
              <div className="aspect-video bg-muted border-b border-border relative flex items-center justify-center overflow-hidden">
                {comp.previewAssets && comp.previewAssets.length > 0 ? (
                  <Image 
                    src={comp.previewAssets[0].url} 
                    alt={comp.name} 
                    fill
                    className="object-cover" 
                  />
                ) : (
                  <span className="text-muted-foreground font-medium">No preview</span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{comp.name}</h3>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full uppercase tracking-wider font-medium">{comp.category}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{comp.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

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
    </div>
  );
}
