import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center">
      <AlertCircle className="h-12 w-12 text-muted-foreground" />
      <h2 className="text-2xl font-bold tracking-tight">Section not found</h2>
      <p className="text-muted-foreground">
        The component or category you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/components/hero">Return to Components</Link>
      </Button>
    </div>
  );
}
