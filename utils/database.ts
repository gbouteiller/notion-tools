import {D} from '@mobily/ts-belt';
import type {Database as NDatabase} from '../schemas/input';
import {pageOrDatabaseCommonFrom, parentFrom, stringFromRichTexts} from './common';

// PROP ====================================================================================================================================
// export function databasePropFrom<P extends NDatabaseProp>(prop: P) {
//   if (prop.type === 'title') return databasePropTitleFrom(prop as NDatabasePropTitle);
//   throw new Error('unknown database prop type');
// }

// MAIN ====================================================================================================================================
export function databaseFrom<D extends NDatabase>({description, is_inline: isInline, object: _, parent, properties, title, ...r}: D) {
  return pageOrDatabaseCommonFrom({
    description: stringFromRichTexts(description),
    isInline,
    parent: parentFrom(parent),
    // eslint-disable-next-line unicorn/no-array-method-this-argument
    properties: D.map(properties, ({id}) => id),
    title: stringFromRichTexts(title),
    ...r,
  });
}
