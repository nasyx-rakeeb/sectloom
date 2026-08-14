import { HeroEfficiency } from '@/components/sectloom/hero-efficiency';
import { CtaApis } from '@/components/sectloom/cta-apis';
import { ContactGrid } from '@/components/sectloom/contact-grid';
import { FooterProducts } from '@/components/sectloom/footer-products';

export default function Home() {
  return (
    <main>
      <HeroEfficiency />
      <CtaApis />
      <ContactGrid />
      <FooterProducts />
    </main>
  );
}
