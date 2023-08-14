import type {PageAny} from '../schemas';
import type {BlockChildDatabase as NBlockChildDatabase} from '../schemas/input';
import {blockChildDatabaseValueFrom} from './block';
import {getPagePropTitle} from './page';
import type {Prop, PropDate, PropFiles, PropMultiSelect, PropRelation, PropRichText, PropRollup, PropSelect, PropTitle} from './prop';

// COLLECTION ==============================================================================================================================
export function collectionSlugFrom(nBlockChildDatabase: NBlockChildDatabase) {
  return blockChildDatabaseValueFrom(nBlockChildDatabase).split(':')[1];
}

// DATE ====================================================================================================================================
function dateValueFrom({value}: Pick<PropDate, 'value'>, extra?: string) {
  return extra === 'end' || extra === 'start' ? value?.[extra] : value;
}

// FILES ===================================================================================================================================
function filesValueFrom({value}: Pick<PropFiles, 'value'>, extra?: string) {
  const values = value.map(({value}) => value);
  return extra === '1' ? values[0] : values;
}

// MULTI-SELECT ============================================================================================================================
function multiSelectValueFrom({value}: Pick<PropMultiSelect, 'value'>, _extra?: string): string[] {
  return value.map(({name}) => name);
}

// RELATION ==================================================================================================================================
function relationValueFrom({value}: Pick<PropRelation, 'value'>, extra?: string) {
  return extra === '1' ? value[0] : value;
}

// RICH TEXT ===============================================================================================================================
function richTextValueFrom({value}: Pick<PropRichText, 'value'>, _extra?: string): string {
  return value[0].text;
}

// ROLLUP ==================================================================================================================================
function rollupValueFrom({value}: Pick<PropRollup, 'value'>, extra?: string) {
  if (value.type !== 'array') return value.value;
  const values = value.value.map((v) => nonRollupValueFrom(v));
  return extra === '1' ? values[0] : values;
}

// SELECT ==================================================================================================================================
function selectValueFrom({value}: Pick<PropSelect, 'value'>, _extra?: string): string | undefined {
  return value?.name;
}

// TITLE ===================================================================================================================================
export function titleValueFrom({value}: Pick<PropTitle, 'value'>, _extra?: string): string {
  return value[0].text;
}

// PROP ====================================================================================================================================
function nonRollupValueFrom<P extends Omit<Exclude<Prop, PropRollup>, 'id'>>(prop: P, extra?: string) {
  if (prop.type === 'date') return dateValueFrom(prop as Omit<PropDate, 'id'>, extra);
  if (prop.type === 'files') return filesValueFrom(prop as Omit<PropFiles, 'id'>, extra);
  if (prop.type === 'multi_select') return multiSelectValueFrom(prop as Omit<PropMultiSelect, 'id'>, extra);
  if (prop.type === 'relation') return relationValueFrom(prop as Omit<PropRelation, 'id'>, extra);
  if (prop.type === 'rich_text') return richTextValueFrom(prop as Omit<PropRichText, 'id'>, extra);
  if (prop.type === 'select') return selectValueFrom(prop as Omit<PropSelect, 'id'>, extra);
  if (prop.type === 'title') return titleValueFrom(prop as Omit<PropTitle, 'id'>, extra);
  return prop.value;
}

export function propValueFrom<P extends Prop>(prop: P, extra?: string) {
  return prop.type === 'rollup' ? rollupValueFrom(prop, extra) : nonRollupValueFrom(prop, extra);
}

// ENTRY ===================================================================================================================================
export function dataFrom(page: PageAny, {filterPrivate = false}: {filterPrivate?: boolean} = {}) {
  let propertyEntries = Object.entries(page.properties);
  if (filterPrivate) propertyEntries = propertyEntries.filter(([name]) => !name.startsWith('_'));
  const entries = propertyEntries.map(([name, pageProp]) => {
    const [key, extra] = name.split(':');
    return key ? [key, propValueFrom(pageProp, extra)] : undefined;
  }).filter(Boolean);
  return Object.fromEntries(entries) as Record<string, unknown>;
}

export function getPageTitle(page: PageAny): string {
  return titleValueFrom(getPagePropTitle(page));
}
