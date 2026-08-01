import Link from 'next/link';
import Image from 'next/image';
import { RegistryIndexItem } from '@/lib/registry/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Terminal } from 'lucide-react';
import { CardCopyButton } from './card-copy-button';

export function ComponentCard({ item }: { item: RegistryIndexItem }) {
  const imageUrl = item.previewAssets[0]?.url;
  const command = `npx sectloom add ${item.name}`;

  return (
    <Link href={`/components/${item.category}/${item.name}`}>
      <Card className="group h-full overflow-hidden transition-colors hover:border-primary">
        {imageUrl && (
          <div className="aspect-video w-full overflow-hidden border-b bg-muted relative">
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <div className="flex items-center justify-between gap-2 mb-1">
            <CardTitle className="line-clamp-1 text-base">
              {item.title}
            </CardTitle>
            <Badge
              variant="secondary"
              className="capitalize text-xs font-normal"
            >
              {item.category}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 text-sm text-muted-foreground min-h-[40px]">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center justify-between gap-2 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 min-w-0">
              <Terminal className="h-3 w-3 shrink-0" />
              <span className="font-mono truncate">{command}</span>
            </div>
            <CardCopyButton text={command} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
