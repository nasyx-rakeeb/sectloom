import { z } from 'zod';

export const ComponentPropsSchema = z.record(z.string(), z.any());

export const ComponentMetadataSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  props: ComponentPropsSchema.optional(),
});

export type ComponentMetadata = z.infer<typeof ComponentMetadataSchema>;
