import { z } from 'zod';

const isUsernameAvailableRequestSchema = z.object({
  usernameToCheck: z.string(),
});

export type IsUsernameAvailableRequest = z.infer<typeof isUsernameAvailableRequestSchema>;

const isUsernameAvailableResponseSchema = z.object({
  error: z.optional(z.string()),
  errorDescription: z.optional(z.string()),
  isUsernameAvailable: z.optional(z.boolean()),
});

export type IsUsernameAvailableResponse = z.infer<typeof isUsernameAvailableResponseSchema>;

const isCommunityNameAvailableRequestSchema = z.object({
  nameToCheck: z.string(),
});

export type IsCommunityNameAvailableRequest = z.infer<typeof isCommunityNameAvailableRequestSchema>;

const isCommunityNameAvailableResponseSchema = z.object({
  error: z.optional(z.string()),
  errorDescription: z.optional(z.string()),
  isNameAvailable: z.optional(z.boolean()),
});

export type IsCommunityNameAvailableResponse = z.infer<typeof isCommunityNameAvailableResponseSchema>;

const isCommunitySlugAvailableRequestSchema = z.object({
  slugToCheck: z.string(),
});

export type IsCommunitySlugAvailableRequest = z.infer<typeof isCommunitySlugAvailableRequestSchema>;

const isCommunitySlugAvailableResponseSchema = z.object({
  error: z.optional(z.string()),
  errorDescription: z.optional(z.string()),
  isSlugAvailable: z.optional(z.boolean()),
});

export type IsCommunitySlugAvailableResponse = z.infer<typeof isCommunitySlugAvailableResponseSchema>;
