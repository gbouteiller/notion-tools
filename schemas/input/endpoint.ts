import {z} from 'zod';
import {zBlockId} from './block';
import {zDatabaseId} from './database';
import {zPageId} from './page';
import {zSearchFilter, zSearchSort} from './search';
import {zUserId} from './user';

// COMMON ==================================================================================================================================
export const zRawListOpts = z.object({
  page_size: z.number().int().min(0).max(100).optional(),
  start_cursor: z.string().optional(),
});

export const zRawSearchOpts = z.object({
  ...zRawListOpts.shape,
  filter: zSearchFilter.optional(),
  query: z.string().optional(),
  sort: zSearchSort.optional(),
});

// BLOCK ===================================================================================================================================
export const zBlocksChildrenListParams = z.object({...zBlockId.shape, ...zRawListOpts.shape});
export type BlocksChildrenListParams = z.infer<typeof zBlocksChildrenListParams>;

export const zBlocksRetrieveParams = zBlockId;
export type BlockRetrieveParams = z.infer<typeof zBlocksRetrieveParams>;

// DATABASE ================================================================================================================================
export const zDatabasesQueryParams = z.object({...zDatabaseId.shape, ...zRawListOpts.shape});
export type DatabasesQueryParams = z.infer<typeof zDatabasesQueryParams>;

export const zDatabasesRetrieveParams = zDatabaseId;
export type DatabasesRetrieveParams = z.infer<typeof zDatabasesRetrieveParams>;

// PAGE ====================================================================================================================================
export const zPagesPropertiesRetrieveParams = z.object({...zPageId.shape, ...zRawListOpts.shape, property_id: z.string()});
export type PagesPropertiesRetrieveParams = z.infer<typeof zPagesPropertiesRetrieveParams>;

export const zPagesRetrieveParams = zPageId;
export type PagesRetrieveParams = z.infer<typeof zPagesRetrieveParams>;

// SEARCH ==================================================================================================================================
export const zSearchParams = zRawSearchOpts;
export type SearchParams = z.infer<typeof zSearchParams>;

// USER ====================================================================================================================================
export const zUsersListParams = zRawListOpts;
export type UsersListParams = z.infer<typeof zUsersListParams>;

export const zUsersMeParams = z.object({});
export type UsersMeParams = z.infer<typeof zUsersMeParams>;

export const zUsersRetrieveParams = zUserId;
export type UsersRetrieveParams = z.infer<typeof zUsersRetrieveParams>;
