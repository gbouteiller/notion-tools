import {
  type Common as NCommon,
  type Date as NDate,
  type File as NFile,
  type FileNamed as NFileNamed,
  type Formula as NFormula,
  type Icon as NIcon,
  type ListCommon as NListCommon,
  type PageOrDatabaseCommon as NPageOrDatabaseCommon,
  type ParentBlock as NParentBlock,
  type ParentDatabase as NParentDatabase,
  type ParentPage as NParentPage,
  type ParentWorkspace as NParentWorkspace,
  type RichText as NRichText,
  type RichTextEquation as NRichTextEquation,
  type RichTextMention as NRichTextMention,
  type RichTextMentionValueDatabase as NRichTextMentionValueDatabase,
  type RichTextMentionValueDate as NRichTextMentionValueDate,
  type RichTextMentionValuePage as NRichTextMentionValuePage,
  type RichTextMentionValueUser as NRichTextMentionValueUser,
  type RichTextText as NRichTextText,
  type Rollup as NRollup
} from '../schemas/input';

// COMMON ==================================================================================================================================
export function banNull<V>(value: V): BanNull<V> {
  return (value ?? undefined) as BanNull<V>;
}

export function commonFrom<C extends NCommon>({created_by, created_time, last_edited_by, last_edited_time, ...r}: C) {
  return {created: {at: created_time, by: created_by.id}, updated: {at: last_edited_time, by: last_edited_by.id}, ...r};
}

export function dateFrom({end, start, time_zone}: NDate) {
  return {end: banNull(end), start, timeZone: banNull(time_zone)};
}

export function fileFrom<F extends NFile>(dto: F) {
  const caption = (dto.caption ?? []).map(richTextFrom);
  if (dto.type === 'external') return {caption, type: dto.type, value: dto.external.url};
  return {caption, type: dto.type, value: dto.file.url};
}

export function fileNamedFrom<F extends NFileNamed>(dto: F) {
  return {...fileFrom(dto), name: dto.name};
}

export function formulaFrom<F extends NFormula>(dto: F) {
  if (dto.type === 'boolean') return {type: dto.type, value: banNull(dto.boolean)};
  if (dto.type === 'date') return {type: dto.type, value: dto.date ? dateFrom(dto.date) : undefined};
  if (dto.type === 'number') return {type: dto.type, value: banNull(dto.number)};
  return {type: dto.type, value: banNull(dto.string)};
}

export function iconFrom(nIcon: NIcon) {
  return nIcon.type === 'emoji' ? {type: 'emoji', value: nIcon.emoji} : {type: 'external', value: nIcon.external.url};
}

export function listCommonFrom<C extends NListCommon>({has_more: hasMore, next_cursor: cursor, object: _, ...r}: C) {
  return {cursor: banNull(cursor), hasMore, ...r};
}

export function pageOrDatabaseCommonFrom<C extends NPageOrDatabaseCommon>({cover, icon, ...r}: C) {
  return commonFrom({cover: cover ? fileFrom(cover) : undefined, icon: icon ? iconFrom(icon) : undefined, ...r});
}

export function parentFrom<P extends NParentBlock | NParentDatabase | NParentPage | NParentWorkspace>(dto: P) {
  if (dto.type === 'block_id') return {type: 'block', id: dto.block_id};
  if (dto.type === 'database_id') return {type: 'database', id: dto.database_id};
  if (dto.type === 'page_id') return {type: 'page', id: dto.page_id};
  return {type: 'workspace' as const};
}

export function richTextMentionValueFrom<
  M extends NRichTextMentionValueDatabase | NRichTextMentionValueDate | NRichTextMentionValuePage | NRichTextMentionValueUser
>(dto: M) {
  if (dto.type === 'database') return {type: dto.type, value: dto.database.id};
  if (dto.type === 'date') return {type: dto.type, value: dateFrom(dto.date)};
  if (dto.type === 'page') return {type: dto.type, value: dto.page.id};
  return {type: dto.type, value: dto.user.id};
}

export function richTextFrom<R extends NRichTextEquation | NRichTextMention | NRichTextText>(dto: R) {
  const {annotations, href, plain_text: text, type} = dto;
  const mention = type === 'mention' ? {mention: richTextMentionValueFrom(dto.mention)} : {};
  return {annotations, href: banNull(href), text, type, ...mention};
}

export function rollupFrom<R extends NRollup>(dto: R) {
  if (dto.type === 'array') return {function: dto.function, type: dto.type, value: dto.array};
  if (dto.type === 'incomplete') return {function: dto.function, type: dto.type};
  if (dto.type === 'number') return {function: dto.function, type: dto.type, value: banNull(dto.number)};
  if (dto.type === 'unsupported') return {function: dto.function, type: dto.type};
  return {function: dto.function, type: dto.type, value: dto.date ? dateFrom(dto.date) : undefined};
}

export function stringFromRichTexts(richTexts: NRichText[]): string {
  return richTexts[0]?.plain_text;
}

// TYPES ===================================================================================================================================
export type BanNull<T> = T extends null ? undefined : T;
// export type FileFrom<F extends NFileExternal | NFileFile> = F extends NFileExternal ? FileExternal : FileFile;
// export type FileNamedFrom<F extends NFileNamedExternal | NFileNamedFile> = F extends NFileNamedExternal ? FileNamedExternal : FileNamedFile;

// export type FormulaFrom<F extends NFormulaBoolean | NFormulaDate | NFormulaNumber | NFormulaString> = F extends NFormulaBoolean
//   ? FormulaBoolean
//   : F extends NFormulaDate
//   ? FormulaDate
//   : F extends NFormulaNumber
//   ? FormulaNumber
//   : FormulaString;

// export type ParentFrom<P extends NParentBlock | NParentDatabase | NParentPage | NParentWorkspace> = P extends NParentBlock
//   ? ParentBlock
//   : P extends NParentDatabase
//   ? ParentDatabase
//   : P extends NParentPage
//   ? ParentPage
//   : ParentWorkspace;

// export type RichTextFrom<R extends NRichTextEquation | NRichTextMention | NRichTextText> = R extends NRichTextEquation
//   ? RichTextEquation
//   : R extends NRichTextMention
//   ? RichTextMention
//   : RichTextText;

// export type RichTextMentionValueFrom<
//   M extends NRichTextMentionValueDatabase | NRichTextMentionValueDate | NRichTextMentionValuePage | NRichTextMentionValueUser
// > = M extends NRichTextMentionValueDatabase
//   ? RichTextMentionValueDatabase
//   : M extends NRichTextMentionValueDate
//   ? RichTextMentionValueDate
//   : M extends NRichTextMentionValuePage
//   ? RichTextMentionValuePage
//   : RichTextMentionValueUser;

// export type RollupFrom<R extends NRollupArray | NRollupDate | NRollupIncomplete | NRollupNumber | NRollupUnsupported> =
//   R extends NRollupArray
//     ? RollupArray
//     : R extends NRollupDate
//     ? RollupDate
//     : R extends NRollupIncomplete
//     ? RollupIncomplete
//     : R extends NRollupNumber
//     ? RollupNumber
//     : RollupUnsupported;



