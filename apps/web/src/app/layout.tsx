import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sectloom - Production React Sections",
  description: "Copy and paste beautiful, accessible, and highly customizable Next.js App Router sections into your codebase.",
  metadataBase: new URL("https://sectloom.dev"),
  openGraph: {
    title: "Sectloom",
    description: "Production-ready React sections.",
    url: "https://sectloom.dev",
    siteName: "Sectloom",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
