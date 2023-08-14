import type {Simplify} from 'type-fest';
import {z} from 'zod';

// COLLECTION ==============================================================================================================================
export const zCollection = z.object({
  ids: z.string().array().min(1),
  slug: z.string(),
  type: z.enum(['content', 'data']),
});
export type Collection = z.infer<typeof zCollection>;

// REF =====================================================================================================================================
export const zAnyDataRef = z.object({collection: z.string(), id: z.string()});
export type AnyDataRef = z.infer<typeof zAnyDataRef>;

export function zDataRef<C extends string>(collection: C) {
  return z.string().transform((id) => ({collection, id}));
}
export type DataRef<C extends string, I extends string = string> = {collection: C; id: I};

export const zAnyContentRef = z.object({collection: z.string(), slug: z.string()});
export type AnyContentRef = z.infer<typeof zAnyContentRef>;

export function zContentRef<C extends string>(collection: C) {
  return z.string().transform((slug) => ({collection, slug}));
}
export type ContentRef<C extends string, S extends string = string> = {collection: C; slug: S};

export const zAnyRef = z.union([zAnyContentRef, zAnyDataRef]);
export type AnyRef = z.infer<typeof zAnyRef>;

// ENTRY ===================================================================================================================================
export const zAnyDataEntry = z.object({...zAnyDataRef.shape, data: z.any()});
export type AnyDataEntry = z.infer<typeof zAnyDataEntry>;

export function zDataEntry<D extends z.AnyZodObject, C extends string>(data: D, collection?: C) {
  return z.object({...zAnyDataEntry.shape, collection: collection ? z.literal(collection) : z.string(), data});
}
export type DataEntry<Data, Collection extends string = string> = Simplify<
  Omit<AnyDataEntry, 'collection' | 'data'> & {
    collection: Collection;
    data: Data;
  }
>;

export const zAnyContentEntry = z.object({...zAnyDataEntry.shape, ...zAnyContentRef.shape, body: z.string()});
export type AnyContentEntry = z.infer<typeof zAnyContentEntry>;

export function zContentEntry<D extends z.ZodTypeAny, C extends string>(data: D, collection?: C) {
  return z.object({...zAnyContentEntry.shape, collection: collection ? z.literal(collection) : z.string(), data});
}
export type ContentEntry<Data, Collection extends string = string> = Simplify<
  Omit<AnyContentEntry, 'collection' | 'data'> & {
    collection: Collection;
    data: Data;
  }
>;

export const zAnyEntry = z.union([zAnyContentEntry, zAnyDataEntry]);
export type AnyEntry = z.infer<typeof zAnyEntry>;
