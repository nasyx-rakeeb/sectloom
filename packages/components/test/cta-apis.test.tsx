import assert from 'node:assert/strict';
import React from 'react';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { CtaApis } from '../src/sections/cta/cta-apis.js';
import { ContactGrid } from '../src/sections/contact/contact-grid.js';
import { FooterProducts } from '../src/sections/footer/footer-products.js';
import { HeroEfficiency } from '../src/sections/hero/hero-efficiency.js';

const LEGACY_STYLING =
  /bg-background|text-foreground|text-muted-foreground|bg-primary|text-primary-foreground|bg-secondary|text-secondary-foreground|border-border|ring-ring|var\(--container|var\(--radius/;

test('CTA server markup is deterministic', () => {
  const render = () =>
    renderToStaticMarkup(
      <CtaApis
        heading="Deterministic CTA"
        cta={{ label: 'Continue', href: '/continue' }}
      />
    );

  const first = render();
  const second = render();

  assert.equal(second, first);
  assert.doesNotMatch(first, /NaN|undefined/);
  assert.doesNotMatch(first, LEGACY_STYLING);
  assert.match(first, /#1000ff/);
  assert.match(first, /sectloom-cta-square-dots/);
});

test('all default sections render without the legacy token contract', () => {
  const sections = [
    renderToStaticMarkup(<HeroEfficiency />),
    renderToStaticMarkup(<ContactGrid />),
    renderToStaticMarkup(<FooterProducts />),
  ];

  for (const markup of sections) {
    assert.doesNotMatch(markup, LEGACY_STYLING);
    assert.doesNotMatch(markup, /NaN|undefined/);
    assert.match(markup, /bg-black/);
  }
});

test('optional section content can be removed without placeholder output', () => {
  const hero = renderToStaticMarkup(
    <HeroEfficiency primaryCta={null} secondaryCta={null} stats={[]} />
  );
  const contact = renderToStaticMarkup(
    <ContactGrid inquiries={[]} address={null} careers={null} socials={null} />
  );

  assert.doesNotMatch(hero, /Start building|View Docs|Latency/);
  assert.doesNotMatch(contact, /Submit brief|Address|Careers|Instagram/);
});
