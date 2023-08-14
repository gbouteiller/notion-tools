import {z} from 'zod';
import {zId, zListCommon, zUserRef} from './common';

// COMMON ==================================================================================================================================
export const zUserCommon = z.object({
  ...zUserRef.shape,
  avatar_url: z.string().nullable(),
  name: z.string().optional(),
});
export type UserCommon = z.infer<typeof zUserCommon>;

// PERSON ==================================================================================================================================
export const zUserPerson = z.object({
  ...zUserCommon.shape,
  person: z.object({
    email: z.string().email(),
  }),
  type: z.literal('person'),
});
export type UserPerson = z.infer<typeof zUserPerson>;

// BOT =====================================================================================================================================
export const zUserBotValue = z.union([
  z.object({
    owner: z.object({
      type: z.literal('workspace'),
      workspace: z.literal(true),
    }),
    workspace_name: z.string().nullable(),
  }),
  z.object({
    owner: z.object({
      type: z.literal('user'),
      user: zUserPerson,
    }),
  }),
  z.object({}),
]);
export type UserBotValue = z.infer<typeof zUserBotValue>;

export const zUserBot = z.object({...zUserCommon.shape, bot: zUserBotValue, type: z.literal('bot')});
export type UserBot = z.infer<typeof zUserBot>;

// MAIN ====================================================================================================================================
export const zUser = z.union([zUserBot, zUserPerson]);
export type User = z.infer<typeof zUser>;

// ID ======================================================================================================================================
export const zUserId = z.object({user_id: zId});
export type UserId = z.infer<typeof zUserId>;

export const zUserPartial = zUser.or(zUserRef);

// LIST ====================================================================================================================================
export const zListUser = z.object({
  ...zListCommon.shape,
  results: zUser.array(),
  type: z.literal('user'),
  user: z.object({}),
});
export type ListUser = z.infer<typeof zListUser>;
