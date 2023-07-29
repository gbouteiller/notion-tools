import {any, array, boolean, enumType, literal, merge, nullable, number, object, optional, string, union, uuid} from 'valibot';

// ID & REFS ===============================================================================================================================
export const vId = string([uuid()]);
export const vIdRef = object({id: vId});
export const vRef = object({id: string()});
export const vIUserRef = object({id: vId, object: literal('user')});

// COLOR ===================================================================================================================================
export const strictColors = ['default', 'gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'] as const;
export const vStrictColor = enumType(strictColors);
export const STRICT_COLOR = vStrictColor.enum;

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
export const vColor = enumType(colors);
export const COLOR = vColor.enum;

// DATE ====================================================================================================================================
export const vIDate = object({
  end: nullable(string()),
  start: string(),
  time_zone: nullable(string()),
});

// EMOJI ===================================================================================================================================
export const vIEmoji = object({emoji: string(), type: literal('emoji')});

// FORMULA =================================================================================================================================
export const vIFormulaBoolean = object({boolean: nullable(boolean()), type: literal('boolean')});
export const vIFormulaDate = object({date: nullable(vIDate), type: literal('date')});
export const vIFormulaNumber = object({number: nullable(number()), type: literal('number')});
export const vIFormulaString = object({string: nullable(string()), type: literal('string')});
export const vIFormula = union([vIFormulaBoolean, vIFormulaDate, vIFormulaNumber, vIFormulaString]);

// LIST ====================================================================================================================================
export const vIListCommon = object({
  has_more: boolean(),
  next_cursor: nullable(string()),
  object: literal('list'),
});

// RICH TEXT ===============================================================================================================================
export const vRichTextAnnotations = object({
  bold: boolean(),
  code: boolean(),
  color: vColor,
  italic: boolean(),
  strikethrough: boolean(),
  underline: boolean(),
});

export const vIRichTextCommon = object({
  annotations: vRichTextAnnotations,
  href: nullable(string()),
  plain_text: string(),
});

export const vIRichTextEquation = merge([
  vIRichTextCommon,
  object({
    equation: object({expression: string()}),
    type: literal('equation'),
  }),
]);

export const vIRichTextMentionValueDatabase = object({database: vIdRef, type: literal('database')});
export const vIRichTextMentionValueDate = object({date: vIDate, type: literal('date')});
export const vIRichTextMentionValuePage = object({page: vIdRef, type: literal('page')});
export const vIRichTextMentionValueUser = object({type: literal('user'), user: vIUserRef});

export const vIRichTextMentionValue = union([
  vIRichTextMentionValueDatabase,
  vIRichTextMentionValueDate,
  vIRichTextMentionValuePage,
  vIRichTextMentionValueUser,
]);

export const vIRichTextMention = merge([
  vIRichTextCommon,
  object({
    mention: vIRichTextMentionValue,
    type: literal('mention'),
  }),
]);

export const vIRichTextText = merge([
  vIRichTextCommon,
  object({
    text: object({
      content: string(),
      link: nullable(object({url: string()})),
    }),
    type: literal('text'),
  }),
]);

export const vIRichText = union([vIRichTextEquation, vIRichTextMention, vIRichTextText]);

// FILE ====================================================================================================================================
export const vIFileCommon = object({caption: optional(array(vIRichText))});

export const vIFileExternal = merge([
  vIFileCommon,
  object({
    external: object({url: string()}),
    type: literal('external'),
  }),
]);

export const vIFileFile = merge([
  vIFileCommon,
  object({
    file: object({expiry_time: string(), url: string()}),
    type: literal('file'),
  }),
]);

export const vIFile = union([vIFileExternal, vIFileFile]);
export const vIFileNamedExternal = merge([vIFileExternal, object({name: string()})]);
export const vIFileNamedFile = merge([vIFileFile, object({name: string()})]);
export const vIFileNamed = union([vIFileNamedExternal, vIFileNamedFile]);

// ICON ====================================================================================================================================
export const vIIcon = union([vIEmoji, vIFileExternal]);

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
export const vNumberFormat = enumType(numberFormats);

// OPTION ==================================================================================================================================
export const vSelectOption = object({color: vStrictColor, id: string(), name: string()});

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
export const vRollupFunction = enumType(rollupFunctions);
export const vIRollupCommon = object({function: vRollupFunction});
export const vIRollupArray = merge([vIRollupCommon, object({array: array(any()), type: literal('array')})]);
export const vIRollupDate = merge([vIRollupCommon, object({date: nullable(vIDate), type: literal('date')})]);
export const vIRollupIncomplete = merge([vIRollupCommon, object({incomplete: object({}), type: literal('incomplete')})]);
export const vIRollupNumber = merge([vIRollupCommon, object({number: nullable(number()), type: literal('number')})]);
export const vIRollupUnsupported = merge([vIRollupCommon, object({type: literal('unsupported'), unsupported: object({})})]);
export const vIRollup = union([vIRollupArray, vIRollupDate, vIRollupIncomplete, vIRollupNumber, vIRollupUnsupported]);

// COMMON ==================================================================================================================================
export const vICommon = object({
  archived: boolean(),
  created_by: vIUserRef,
  created_time: string(),
  id: vId,
  last_edited_by: vIUserRef,
  last_edited_time: string(),
});

export const vIPageOrDatabaseCommon = merge([
  vICommon,
  object({
    cover: nullable(vIFile),
    icon: nullable(vIIcon),
    url: string(),
  }),
]);

// PARENT ==================================================================================================================================
export const vIParentBlock = object({block_id: vId, type: literal('block_id')});
export const vIParentDatabase = object({database_id: vId, type: literal('database_id')});
export const vIParentPage = object({page_id: vId, type: literal('page_id')});
export const vIParentWorkspace = object({type: literal('workspace'), workspace: boolean()});
