import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main
        id="main-content"
        className="flex-1 flex flex-col items-center justify-center p-6 text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Page not found
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  );
}
