import type {Simplify} from 'type-fest';
import {z} from 'zod';

// ID & REFS ===============================================================================================================================
export const zId = z.string().uuid();
export const zIdRef = z.object({id: zId});
export const zRef = z.object({id: z.string()});
export const zUserRef = z.object({id: zId, object: z.literal('user')});
export type UserRef = z.infer<typeof zUserRef>;

// COLOR ===================================================================================================================================
export const strictColors = ['default', 'gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'] as const;
export const zStrictColor = z.enum(strictColors);
export const STRICT_COLOR = zStrictColor.enum;
export type StrictColor = z.infer<typeof zStrictColor>;

export const colors = [
  ...strictColors,
  'gray_background',
  'brown_background',
  'orange_background',
  'yellow_background',
  'green_background',
  'blue_background',
  'purple_background',
  'pink_background',
  'red_background',
] as const;
export const zColor = z.enum(colors);
export const COLOR = zColor.enum;
export type Color = z.infer<typeof zColor>;

// DATE ====================================================================================================================================
export const zDate = z.object({
  end: z.string().nullable(),
  start: z.string(),
  time_zone: z.string().nullable(),
});
export type Date = z.infer<typeof zDate>;

// EMOJI ===================================================================================================================================
export const zEmoji = z.object({emoji: z.string(), type: z.literal('emoji')});
export type Emoji = z.infer<typeof zEmoji>;

// FORMULA =================================================================================================================================
export const zFormulaBoolean = z.object({boolean: z.boolean().nullable(), type: z.literal('boolean')});
export type FormulaBoolean = z.infer<typeof zFormulaBoolean>;

export const zFormulaDate = z.object({date: zDate.nullable(), type: z.literal('date')});
export type FormulaDate = z.infer<typeof zFormulaDate>;

export const zFormulaNumber = z.object({number: z.number().nullable(), type: z.literal('number')});
export type FormulaNumber = z.infer<typeof zFormulaNumber>;

export const zFormulaString = z.object({string: z.string().nullable(), type: z.literal('string')});
export type FormulaString = z.infer<typeof zFormulaString>;

export const zFormula = z.union([zFormulaBoolean, zFormulaDate, zFormulaNumber, zFormulaString]);
export type Formula = z.infer<typeof zFormula>;

// LIST ====================================================================================================================================
export const zListCommon = z.object({
  has_more: z.boolean(),
  next_cursor: z.string().nullable(),
  object: z.literal('list'),
});
export type ListCommon = z.infer<typeof zListCommon>;

// RICH TEXT ===============================================================================================================================
export const zRichTextAnnotations = z.object({
  bold: z.boolean(),
  code: z.boolean(),
  color: zColor,
  italic: z.boolean(),
  strikethrough: z.boolean(),
  underline: z.boolean(),
});

export const zRichTextCommon = z.object({
  annotations: zRichTextAnnotations,
  href: z.string().nullable(),
  plain_text: z.string(),
});

export const zRichTextEquation = z.object({
  ...zRichTextCommon.shape,
  equation: z.object({expression: z.string()}),
  type: z.literal('equation'),
});
export type RichTextEquation = Simplify<z.infer<typeof zRichTextEquation>>;

export const zRichTextMentionValueDatabase = z.object({database: zIdRef, type: z.literal('database')});
export type RichTextMentionValueDatabase = z.infer<typeof zRichTextMentionValueDatabase>;
export const zRichTextMentionValueDate = z.object({date: zDate, type: z.literal('date')});
export type RichTextMentionValueDate = z.infer<typeof zRichTextMentionValueDate>;
export const zRichTextMentionValuePage = z.object({page: zIdRef, type: z.literal('page')});
export type RichTextMentionValuePage = z.infer<typeof zRichTextMentionValuePage>;
export const zRichTextMentionValueUser = z.object({type: z.literal('user'), user: zUserRef});
export type RichTextMentionValueUser = z.infer<typeof zRichTextMentionValueUser>;
export const zRichTextMentionValue = z.union([
  zRichTextMentionValueDatabase,
  zRichTextMentionValueDate,
  zRichTextMentionValuePage,
  zRichTextMentionValueUser,
]);
export type RichTextMentionValue = z.infer<typeof zRichTextMentionValue>;

export const zRichTextMention = z.object({
  ...zRichTextCommon.shape,
  mention: zRichTextMentionValue,
  type: z.literal('mention'),
});
export type RichTextMention = Simplify<z.infer<typeof zRichTextMention>>;

export const zRichTextText = z.object({
  ...zRichTextCommon.shape,
  text: z.object({
    content: z.string(),
    link: z.object({url: z.string()}).nullable(),
  }),
  type: z.literal('text'),
});
export type RichTextText = Simplify<z.infer<typeof zRichTextText>>;

export const zRichText = z.union([zRichTextEquation, zRichTextMention, zRichTextText]);
export type RichText = z.infer<typeof zRichText>;

// FILE ====================================================================================================================================
export const zFileCommon = z.object({caption: zRichText.array().optional()});

export const zFileExternal = z.object({
  ...zFileCommon.shape,
  external: z.object({url: z.string()}),
  type: z.literal('external'),
});
export type FileExternal = z.infer<typeof zFileExternal>;

export const zFileFile = z.object({
  ...zFileCommon.shape,
  file: z.object({expiry_time: z.string(), url: z.string()}),
  type: z.literal('file'),
});
export type FileFile = z.infer<typeof zFileFile>;

export const zFile = z.union([zFileExternal, zFileFile]);
export type File = z.infer<typeof zFile>;

export const zFileNamedExternal = z.object({...zFileExternal.shape, name: z.string()});
export type FileNamedExternal = Simplify<z.infer<typeof zFileNamedExternal>>;

export const zFileNamedFile = z.object({...zFileFile.shape, name: z.string()});
export type FileNamedFile = z.infer<typeof zFileNamedFile>;

export const zFileNamed = z.union([zFileNamedExternal, zFileNamedFile]);
export type FileNamed = z.infer<typeof zFileNamed>;

// ICON ====================================================================================================================================
export const zIcon = z.union([zEmoji, zFileExternal]);
export type Icon = z.infer<typeof zIcon>;

// NUMBER ==================================================================================================================================
export const numberFormats = [
  'number',
  'number_with_commas',
  'percent',
  'dollar',
  'canadian_dollar',
  'euro',
  'pound',
  'yen',
  'ruble',
  'rupee',
  'won',
  'yuan',
  'real',
  'lira',
  'rupiah',
  'franc',
  'hong_kong_dollar',
  'new_zealand_dollar',
  'krona',
  'norwegian_krone',
  'mexican_peso',
  'rand',
  'new_taiwan_dollar',
  'danish_krone',
  'zloty',
  'baht',
  'forint',
  'koruna',
  'shekel',
  'chilean_peso',
  'philippine_peso',
  'dirham',
  'colombian_peso',
  'riyal',
  'ringgit',
  'leu',
  'argentine_peso',
  'uruguayan_peso',
] as const;
export const zNumberFormat = z.enum(numberFormats);

// OPTION ==================================================================================================================================
export const zSelectOption = z.object({color: zStrictColor, id: z.string(), name: z.string()});
export type SelectOption = z.infer<typeof zSelectOption>;

// ROLLUP ==================================================================================================================================
export const rollupFunctions = [
  'average',
  'checked',
  'count',
  'count_per_group',
  'count_values',
  'date_range',
  'earliest_date',
  'empty',
  'latest_date',
  'max',
  'median',
  'min',
  'not_empty',
  'percent_checked',
  'percent_empty',
  'percent_not_empty',
  'percent_per_group',
  'percent_unchecked',
  'range',
  'show_original',
  'show_unique',
  'sum',
  'unchecked',
  'unique',
] as const;
export const zRollupFunction = z.enum(rollupFunctions);
export const zRollupCommon = z.object({function: zRollupFunction});

export const zRollupArray = z.object({...zRollupCommon.shape, array: z.any().array(), type: z.literal('array')});
export type RollupArray = z.infer<typeof zRollupArray>;

export const zRollupDate = z.object({...zRollupCommon.shape, date: zDate.nullable(), type: z.literal('date')});
export type RollupDate = z.infer<typeof zRollupDate>;

export const zRollupIncomplete = z.object({...zRollupCommon.shape, incomplete: z.object({}), type: z.literal('incomplete')});
export type RollupIncomplete = z.infer<typeof zRollupIncomplete>;

export const zRollupNumber = z.object({...zRollupCommon.shape, number: z.number().nullable(), type: z.literal('number')});
export type RollupNumber = z.infer<typeof zRollupNumber>;

export const zRollupUnsupported = z.object({...zRollupCommon.shape, type: z.literal('unsupported'), unsupported: z.object({})});
export type RollupUnsupported = z.infer<typeof zRollupUnsupported>;

export const zRollup = z.union([zRollupArray, zRollupDate, zRollupIncomplete, zRollupNumber, zRollupUnsupported]);
export type Rollup = z.infer<typeof zRollup>;

// COMMON ==================================================================================================================================
export const zCommon = z.object({
  archived: z.boolean(),
  created_by: zUserRef,
  created_time: z.string(),
  id: zId,
  last_edited_by: zUserRef,
  last_edited_time: z.string(),
});
export type Common = z.infer<typeof zCommon>;

export const zPageOrDatabaseCommon = z.object({
  ...zCommon.shape,
  cover: zFile.nullable(),
  icon: zIcon.nullable(),
  url: z.string(),
});
export type PageOrDatabaseCommon = z.infer<typeof zPageOrDatabaseCommon>;

// PARENT ==================================================================================================================================
export const zParentBlock = z.object({block_id: zId, type: z.literal('block_id')});
export type ParentBlock = z.infer<typeof zParentBlock>;

export const zParentDatabase = z.object({database_id: zId, type: z.literal('database_id')});
export type ParentDatabase = z.infer<typeof zParentDatabase>;

export const zParentPage = z.object({page_id: zId, type: z.literal('page_id')});
export type ParentPage = z.infer<typeof zParentPage>;

export const zParentWorkspace = z.object({type: z.literal('workspace'), workspace: z.literal(true)});
export type ParentWorkspace = z.infer<typeof zParentWorkspace>;
