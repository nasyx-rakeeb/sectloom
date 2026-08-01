import Link from 'next/link';
import { docsNavigation } from '@/lib/navigation/docs-nav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface DocsSidebarProps {
  currentPath: string;
}

export function DocsSidebar({ currentPath }: DocsSidebarProps) {
  return (
    <div className="w-64 shrink-0 hidden lg:block border-r sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <ScrollArea className="h-full py-6 pr-6 lg:pl-8">
        <div className="flex flex-col gap-6">
          {docsNavigation.map((section, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h4 className="font-medium px-3 text-sm">{section.title}</h4>
              <div className="flex flex-col gap-1">
                {section.items.map((item, itemIndex) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'text-sm px-3 py-1.5 rounded-md transition-colors',
                        isActive
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
