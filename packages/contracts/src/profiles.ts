import { z } from 'zod';

export const DesignProfileSchema = z.object({
  style: z.enum([
    'Minimal',
    'Modern',
    'Playful',
    'Corporate',
    'Brutalism',
    'Neumorphism',
  ]),
  theme: z.enum(['Light', 'Dark', 'System', 'Any']),
  complexity: z.enum(['Low', 'Medium', 'High']),
  tags: z.array(z.string()).default([]),
});

export type DesignProfile = z.infer<typeof DesignProfileSchema>;
