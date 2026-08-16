import type { Metadata } from 'next';
import { DM_Serif_Display, JetBrains_Mono, Manrope } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SkipLink } from '@/components/layout/skip-link';
import { siteConfig } from '@/config/site';
import './globals.css';

const fontSans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL('https://sectloom.vercel.app'),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: 'https://sectloom.vercel.app',
    siteName: siteConfig.name,
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
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    title: siteConfig.name,
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.className} ${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
