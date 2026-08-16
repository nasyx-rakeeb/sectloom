import Link from 'next/link';
import Image from 'next/image';
import { RegistryIndexItem } from '@/lib/registry/data';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { CardCopyButton } from './card-copy-button';
import { cn } from '@/lib/utils';

interface ComponentCardProps {
  item: RegistryIndexItem;
  className?: string;
  priority?: boolean;
}

export function ComponentCard({
  item,
  className,
  priority = false,
}: ComponentCardProps) {
  const imageUrl = item.previewAssets[0]?.url;
  const command = `npx sectloom add ${item.name}`;
  const href = `/components/${item.category}/${item.name}`;

  return (
    <article
      className={cn(
        'group flex min-w-0 flex-col border-t editorial-rule pt-3',
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>{item.category.replaceAll('-', ' ')}</span>
        <span>v{item.version}</span>
      </div>

      {imageUrl ? (
        <Link
          href={href}
          aria-label={`View ${item.title}`}
          className="relative block aspect-[16/10] overflow-hidden bg-[#151611] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[0.985]">
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              priority={priority}
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              sizes="(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        </Link>
      ) : (
        <div className="aspect-[16/10] bg-muted" />
      )}

      <div className="flex flex-1 flex-col py-5">
        <Link
          href={href}
          className="group/title flex items-start justify-between gap-4 focus-visible:outline-none"
        >
          <h2 className="text-balance text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
            {item.title}
          </h2>
          <ArrowUpRight className="mt-1 size-5 shrink-0 transition-transform duration-200 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5" />
        </Link>
        <p className="text-pretty mt-3 max-w-[55ch] text-sm leading-6 text-muted-foreground">
          {item.description}
        </p>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-3 border-y editorial-rule py-3 font-mono text-[11px] text-muted-foreground">
            <div className="flex min-w-0 items-center gap-2">
              <Terminal className="size-3.5 shrink-0" />
              <span className="truncate">{command}</span>
            </div>
            <CardCopyButton text={command} />
          </div>
        </div>
      </div>
    </article>
  );
}
