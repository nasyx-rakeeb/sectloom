import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SkipLink } from '@/components/layout/skip-link';
import { siteConfig } from '@/config/site';
import './globals.css';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Sectloom',
    template: '%s — Sectloom',
  },
  description: siteConfig.description,
  metadataBase: new URL('https://sectloom.vercel.app'),
  openGraph: {
    title: 'Sectloom',
    description: siteConfig.description,
    url: 'https://sectloom.vercel.app',
    siteName: 'Sectloom',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.className} ${fontSans.variable} ${fontMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SkipLink />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
