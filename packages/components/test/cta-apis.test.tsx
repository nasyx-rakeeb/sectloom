import assert from 'node:assert/strict';
import React from 'react';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { CtaApis } from '../src/sections/cta/cta-apis.js';

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
});
