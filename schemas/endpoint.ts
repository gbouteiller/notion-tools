import {z} from 'zod';
import {zIdRef, zRawListOpts, zRawSearchOpts, zSearchSort} from './input';

// COMMON ==================================================================================================================================
export const zListOpts = z.object({
  cursor: zRawListOpts.shape.start_cursor,
  take: zRawListOpts.shape.page_size,
});
export type ListOpts = z.infer<typeof zListOpts>;

const zSearchOpts = z.object({...zListOpts.shape, query: zRawSearchOpts.shape.query, sort: zSearchSort.shape.direction.optional()});

// BLOCK ===================================================================================================================================
export const zFindBlockParams = zIdRef;
export type FindBlockParams = z.infer<typeof zFindBlockParams>;

export const zFindBlockChildrenParams = z.object({...zIdRef.shape, ...zListOpts.shape});
export type FindBlockChildrenParams = z.infer<typeof zFindBlockChildrenParams>;

// DATABASE ================================================================================================================================
export const zFindDatabaseParams = zIdRef;
export type FindDatabaseParams = z.infer<typeof zFindDatabaseParams>;

export const zFindDatabaseItemsParams = z.object({...zIdRef.shape, ...zListOpts.shape});
export type FindDatabaseItemsParams = z.infer<typeof zFindDatabaseItemsParams>;

export const zFindDatabasesParams = z.object({...zSearchOpts.shape});
export type FindDatabasesParams = z.infer<typeof zFindDatabasesParams>;

// PAGE ====================================================================================================================================
export const zFindPageParams = zIdRef;
export type FindPageParams = z.infer<typeof zFindPageParams>;

export const zFindPagesParams = zSearchOpts;
export type FindPagesParams = z.infer<typeof zFindPagesParams>;

// PROP ====================================================================================================================================
export const zFindPropParams = z.object({...zIdRef.shape, ...zListOpts.shape, prop: z.string()});
export type FindPropParams = z.infer<typeof zFindPropParams>;

// SEARCH ==================================================================================================================================
export const zFindPagesOrDatabasesParams = zSearchOpts;
export type FindPagesOrDatabasesParams = z.infer<typeof zFindPagesOrDatabasesParams>;

// USER ====================================================================================================================================
export const zFindUserParams = zIdRef;
export type FindUserParams = z.infer<typeof zFindUserParams>;

export const zFindUsersParams = zListOpts;
export type FindUsersParams = z.infer<typeof zFindUsersParams>;
