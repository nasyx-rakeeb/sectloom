import { z } from 'zod';
import { DesignProfileSchema } from './profiles.js';

export const RegistryFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  url: z.string().optional(),
  type: z.enum([
    'registry:ui',
    'registry:component',
    'registry:section',
    'registry:lib',
    'registry:hook',
  ]),
  checksum: z.string().optional(),
});

export const PreviewAssetSchema = z.object({
  type: z.enum(['image', 'video']),
  url: z.string(),
  alt: z.string().optional(),
});

export const SourceReferenceSchema = z.object({
  sourceId: z.string(),
  sourceTitle: z.string(),
  sourceLocalPath: z.string(),
});

export const RegistryItemSchema = z.object({
  name: z.string(),
  type: z.enum(['registry:ui', 'registry:component', 'registry:section']),
  category: z.string(),
  title: z.string(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  requires: z.record(z.string(), z.string()).optional(),
  files: z.array(RegistryFileSchema),
  tailwind: z
    .object({
      tokens: z.record(z.string(), z.string()).optional(),
    })
    .optional(),
  requiredTokens: z.array(z.string()).default([]),
  designProfiles: z.array(DesignProfileSchema).default([]),
  sourceReferenceMetadata: SourceReferenceSchema.optional(),
  propsDocumentation: z.record(z.string(), z.string()).optional(),
  supportedNextJsRange: z.string().optional(),
  previewAssets: z.array(PreviewAssetSchema).default([]),
  version: z.string().default('0.1.0'),
  checksum: z.string().optional(),
});

export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type RegistryFile = z.infer<typeof RegistryFileSchema>;
export type PreviewAsset = z.infer<typeof PreviewAssetSchema>;
