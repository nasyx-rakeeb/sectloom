#!/usr/bin/env bash
set -e

echo "=== Sectloom CLI Compatibility Validation ==="

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT="$DIR/.."

echo "[1/8] Rebuilding Registry & CLI"
cd "$ROOT"
pnpm run format
pnpm run lint
pnpm run typecheck
pnpm --filter @sectloom/registry run build
pnpm --filter sectloom run build

echo "[2/8] Packing CLI"
cd "$ROOT/packages/cli"
pnpm pack
CLI_TARBALL=$(ls sectloom-*.tgz | head -n 1)
CLI_TARBALL_PATH="$ROOT/packages/cli/$CLI_TARBALL"

echo "[3/8] Starting Registry Server"
cd "$ROOT"
pnpm --filter @sectloom/registry run serve &
REGISTRY_PID=$!
sleep 2

echo "[4/8] Creating Clean Next.js App Router Project"
cd "$ROOT"
rm -rf disposable-fixture
npx -y create-next-app@latest disposable-fixture --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
cd disposable-fixture

npm install tailwindcss@4.0.0-alpha.15 @tailwindcss/postcss@4.0.0-alpha.15 postcss@8
rm tailwind.config.ts
cat << 'EOF' > postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
EOF
cat << 'EOF' > src/app/globals.css
@import "tailwindcss";
EOF

echo "[5/8] Testing CLI Init"
node "$ROOT/packages/cli/dist/index.js" init --yes -c .

echo "[6/8] Testing CLI Add"
node "$ROOT/packages/cli/dist/index.js" add hero-efficiency --yes -c .
node "$ROOT/packages/cli/dist/index.js" add cta-apis --yes -c .
node "$ROOT/packages/cli/dist/index.js" add contact-grid --yes -c .
node "$ROOT/packages/cli/dist/index.js" add footer-products --yes -c .

echo "[7/8] Integrating Components into Page"
cat << 'EOF' > src/app/page.tsx
import { HeroEfficiency } from "@/components/sectloom/hero-efficiency";
import { CtaApis } from "@/components/sectloom/cta-apis";
import { ContactGrid } from "@/components/sectloom/contact-grid";
import { FooterProducts } from "@/components/sectloom/footer-products";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroEfficiency
        overline="TEST OVERLINE"
        heading="Test Heading"
        primaryCta={{ label: "Start", href: "#" }}
        secondaryCta={{ label: "Learn", href: "#" }}
        stats={[{ label: "Users", value: "10k" }]}
      />
      <CtaApis
        heading="Call to Action"
        cta={{ label: "Click Me", href: "#" }}
      />
      <ContactGrid
        heading="Contact Us"
        inquiries={[]}
        address={{ label: "Address", location: "123 Street", description: "Desc" }}
        careers={{ label: "Careers", href: "#" }}
        socials={{ label: "Socials", links: [] }}
      />
      <FooterProducts
        brand={{ name: "Sectloom", description: "Test", certification: "ISO" }}
        navigation={[]}
        enterpriseCta={{ label: "Enterprise", href: "#" }}
        socials={[]}
        linkGroups={[]}
        legal={{ privacyHref: "/privacy", termsHref: "/terms", copyright: "Copyright" }}
      />
    </main>
  );
}
EOF

echo "[8/8] Validating Consumer Build"
npm run typecheck
npm run build

echo "=== Validation Successful ==="

kill $REGISTRY_PID
