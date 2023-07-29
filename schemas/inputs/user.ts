import {array, boolean, email, literal, merge, nullable, object, optional, string, union} from 'valibot';
import {vIListCommon, vIUserRef, vId} from './common';

// COMMON ==================================================================================================================================
export const vIUserCommon = merge([
  vIUserRef,
  object({
    avatar_url: nullable(string()),
    name: optional(string()),
  }),
]);

// PERSON ==================================================================================================================================
export const vIUserPerson = merge([
  vIUserCommon,
  object({
    person: object({
      email: string([email()]),
    }),
    type: literal('person'),
  }),
]);

// BOT =====================================================================================================================================
export const vIUserBotValue = union([
  object({
    owner: object({
      type: literal('workspace'),
      workspace: boolean(),
    }),
    workspace_name: nullable(string()),
  }),
  object({
    owner: object({
      type: literal('user'),
      user: vIUserPerson,
    }),
  }),
  object({}),
]);

export const vIUserBot = merge([vIUserCommon, object({bot: vIUserBotValue, type: literal('bot')})]);

// MAIN ====================================================================================================================================
export const vIUser = union([vIUserBot, vIUserPerson]);

// ID ======================================================================================================================================
export const vIUserId = object({user_id: vId});

export const vIUserPartial = union([vIUser, vIUserRef]);

// LIST ====================================================================================================================================
export const vIListUser = merge([
  vIListCommon,
  object({
    results: array(vIUser),
    type: literal('user'),
    user: object({}),
  }),
]);
