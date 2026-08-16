import Link from 'next/link';
import { docsNavigation } from '@/lib/navigation/docs-nav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface DocsSidebarProps {
  currentPath: string;
}

export function DocsSidebar({ currentPath }: DocsSidebarProps) {
  return (
    <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] shrink-0 border-r border-border lg:block">
      <ScrollArea className="h-full py-10 pr-8">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Documentation
          </p>
          <h2 className="mt-2 font-display text-3xl leading-none">
            From install to ownership.
          </h2>
        </div>
        <nav className="flex flex-col gap-7" aria-label="Documentation">
          {docsNavigation.map((section, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {section.title}
              </h3>
              <div className="flex flex-col border-t border-border">
                {section.items.map((item, itemIndex) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'border-b border-border py-2.5 text-sm transition-colors',
                        isActive
                          ? 'font-semibold text-foreground underline decoration-accent decoration-[3px] underline-offset-4'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
