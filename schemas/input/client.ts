import {LogLevel, type Logger} from '@notionhq/client';
import type {SupportedFetch} from '@notionhq/client/build/src/fetch-types';
import {Agent} from 'node:http';
import {z} from 'zod';

export const zLogLevel = z.nativeEnum(LogLevel);

export const zClientOpts = z.object({
  agent: z.custom<Agent>().optional(),
  auth: z.string().optional(),
  baseUrl: z.string().optional(),
  fetch: z.custom<SupportedFetch>().optional(),
  logLevel: zLogLevel.optional(),
  logger: z.custom<Logger>().optional(),
  notionVersion: z.string().optional(),
  timeoutMs: z.number().optional(),
});
export type ClientOpts = z.infer<typeof zClientOpts>;