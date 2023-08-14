import {
  type ListUser as NListUser,
  type User as NUser,
  type UserBot as NUserBot,
  type UserBotValue as NUserBotValue,
  type UserCommon as NUserCommon,
  type UserPerson as NUserPerson,
} from '../schemas/input';
import {banNull, listCommonFrom} from './common';

// MAIN ====================================================================================================================================
export function userBotFrom({bot, ...r}: NUserBot) {
  return userCommonFrom({owner: userBotOwnerFrom(bot), ...r});
}

export function userBotOwnerFrom(nValue: NUserBotValue) {
  if ('workspace_name' in nValue) return {type: 'workspace', value: banNull(nValue.workspace_name)};
  if ('owner' in nValue) return {type: 'user', value: userPersonFrom(nValue.owner.user)};
}

export function userCommonFrom<U extends NUserCommon>({avatar_url, object: _, ...r}: U) {
  return {avatar: banNull(avatar_url), ...r};
}

export function userPersonFrom({person: {email}, ...r}: NUserPerson) {
  return userCommonFrom({email, ...r});
}

export function userFrom<U extends NUser>(user: U) {
  if (user.type === 'bot') return userBotFrom(user);
  if (user.type === 'person') return userPersonFrom(user);
  throw new Error('unknown user type');
}

// LIST ====================================================================================================================================
export function listUserFrom<L extends NListUser>({results, type: _, user: __, ...r}: L) {
  return listCommonFrom({results: results.map(userFrom), ...r});
}
